'use strict';
var q = require('q');
const Order = require('./../models/order');
const Invoice = require('./../models/invoice');
const NumberRunner = require('./../services/numberRunner');

class InvoiceController {

    create(invoice) {
        let deferred = q.defer();

        NumberRunner.getInvoiceNumber()
            .then((invoiceNumber) => {
                let invoice = Object.assign(new Invoice(), invoice, { invoiceNumber });
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
                        let data = Object.assign(current, invoice);
                        data.save()
                            .then(invoice => deferred.resolve(invoice));
                    }
                }
            });
        return deferred.promise;
    }

    createFromOrder(division, orderNumber) {
        let deferred = q.defer();
        Order.findOne({ division, orderNumber })
            .then(order => {
                if (!order) {
                    deferred.reject(`[Create Invoice From Order] (order not found) ${orderNumber}`);
                }
                else if (order.status == "Completed") {
                    deferred.reject(`[Create Invoice From Order] (order completed) ${orderNumber}`);
                }
                else if (order.status == "Open" || order.status == "Confirmed") {
                    NumberRunner.getInvoiceNumber()
                    .then(invoiceNumber => {
                        let invoice = Object.assign(new Invoice(), order, { invoiceNumber });
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