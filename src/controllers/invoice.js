'use strict';
var q = require('q');
const Order = require('./../models/order');
const Invoice = require('./../models/invoice');
const Number = require('./../services/numberRunner');
const ObjectID = require('mongodb').ObjectID;
const config = require('./../config/db');
const OrderController = require('./../controllers/order');

const calculateInvoice = (invoice) => {

    let total = 0;
    invoice.lines.map(line => {
        line.total = line.price * line.quantity;
        total += line.total;
    });

    invoice.total = total;

    return invoice;
}

class InvoiceController {

    create(invoice) {
        let deferred = q.defer();
        Number.getInvoiceNumber(invoice.division)
            .then((invoiceNumber) => {
                invoice = Object.assign(new Invoice(), calculateInvoice(invoice), { invoiceNumber });
                invoice.save()
                    .then(invoice => deferred.resolve(invoice));
            });

        return deferred.promise;
    }

    retrieve(filter) {
        let deferred = q.defer();
        Invoice.find(filter)
            .then(invoices => deferred.resolve(invoices));
        return deferred.promise;
    }

    update(invoice) {
        let deferred = q.defer();
        Invoice.findOne({ division: invoice.division, _id: invoice._id })
            .then(current => {
                if (!current) {
                    deferred.reject(`[Update Invoice] Record not found. ${invoice.invoiceNumber}`);
                }
                else {
                    if (current.status == 'Completed' || current.status == 'Comfirmed') {
                        deferred.reject(`[Update Invoice] Confirmed/Completed. ${invoice.invoiceNumber}`);
                    }
                    else {
                        delete invoice._id;
                        let data = Object.assign(current, calculateInvoice(invoice));
                        data.save()
                            .then(invoice => deferred.resolve(invoice));
                    }
                }
            });
        return deferred.promise;
    }

    createFromOrder(order) {
        let deferred = q.defer();
        Order.findOne({ division: order.division, _id: order._id })
            .then(currentOrder => {
                if (!currentOrder) {
                    deferred.reject(`[Create Invoice From Order] (order not found) ${order.orderNumber}`);
                }
                else if (currentOrder.status == "Completed") {
                    deferred.reject(`[Create Invoice From Order] (order completed) ${order.orderNumber}`);
                }
                else if (currentOrder.status == "Open" || currentOrder.status == "Confirmed") {
                    Number.getInvoiceNumber(order.division)
                        .then(invoiceNumber => {
                            let invoice = Object.assign(new Invoice, currentOrder, 
                                {
                                    invoiceNumber, 
                                    _id : new ObjectID(),
                                    isNew : true
                                });

                            invoice.save()
                                .then(invoice => 
                                    {
                                        var orderController = new OrderController();
                                        order.status = "Completed";
                                        orderController.update(order)
                                        .then(x =>                           
                                            deferred.resolve(invoice)
                                        );
                                    }
                                )

                        });
                }
            });
        return deferred.promise;
    }

    delete(invoice) {
        let deferred = q.defer();
        Invoice.findOne({ division: invoice.division, _id: invoice._id })
            .then(invoice => {
                if (!invoice) {
                    deferred.reject(`[Delete Invoice] not found. ${invoiceNumber}`);
                }
                else {
                    if (invoice.status != 'Completed' || invoice.status != 'Confirmed') {
                        deferred.reject(`[Delete Invoice] Completed/Confirmed. ${invoiceNumber}`);
                    }
                    else {
                        Invoice.remove(invoice)
                            .then(() => deferred.resolve(`[Delete Invoice] succeed. ${invoiceNumber}`));
                    }
                }
            });
        return deferred.promise;
    }
}

module.exports = InvoiceController;