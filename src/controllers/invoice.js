'use strict';
var q = require('q');
const Order = require('./../models/order');
const Invoice = require('./../models/invoice');
const Number = require('./../services/numberRunner');

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
                invoice = Object.assign(new Invoice(), calculateInvoice(invoice), {invoiceNumber});
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
        Order.findOne({ division : order.division, _id:order._id })
            .then(order => {
                if (!order) {
                    deferred.reject(`[Create Invoice From Order] (order not found) ${orderNumber}`);
                }
                else if (order.status == "Completed") {
                    deferred.reject(`[Create Invoice From Order] (order completed) ${orderNumber}`);
                }
                else if (order.status == "Open" || order.status == "Confirmed") {
                    Number.getInvoiceNumber(order.division)
                        .then(invoiceNumber => {
                            delete order._id;
                            delete order.id;
                            let invoice = Object.assign(new Invoice(), order, { _id: new ObjectID(), invoiceNumber });
                            invoice.save()
                                .then(invoice => deferred.resolve(invoice))
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