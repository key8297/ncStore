'use strict';
var q = require('q');
const Order = require('./../models/order');
const Invoice = require('./../models/invoice');
const NumberRunner = require('./../services/numberRunner');

class InvoiceController {

    createInvoice(newInvoice) {
        let deferred = q.defer();
        
        NumberRunner.getInvoiceNumber()
        .then((invoiceNumber) => {
            let invoice = Object.assign(new Invoice(), newInvoice, { invoiceNumber});
            invoice.save()
                .then(invoice => deferred.resolve(invoice));
        });

        return deferred.promise;
    }

    retrieveInvoice(filter) {
        let deferred = q.defer();
        Invoice.find(filter)
            .then(invoices => deferred.resolve(invoices));
        return deferred.promise;
    }

    updateInvoice(invoice) {
        let deferred = q.defer();
        Invoice.find({ invoiceNumber: invoice.invoiceNumber })
            .then(current => {
                if (!current) {
                    deferred.reject(`[Update Invoice] Record not found. ${invoice.invoiceNumber}`);
                }
                else {
                    if (current.status == 'Completed' || current.status == 'Comfirmed') {
                        deferred.reject(`[Update Invoice] Confirmed/Completed. ${invoice.invoiceNumber}`);
                    }
                    else {
                        let invoice = Object.assign(current, invoice);
                        invoice.save()
                            .then(invoice => deferred.resolve(invoice));
                    }
                }
            });
        return deferred.promise;
    }

    createInvoiceFromOrder(orderNumber) {
        let deferred = q.defer();
        Order.find({ orderNumber })
            .then(order => {
                if (!order) {
                    deferred.reject(`[Create Invoice From Order] (order not found) ${orderNumber}`);
                }
                else if (order.status == "Completed") {
                    deferred.reject(`[Create Invoice From Order] (order completed) ${orderNumber}`);
                }
                else if (order.status == "Open" || order.status == "Confirmed") {
                    let invoice = Object.assign(new Invoice(), order, { invoiceNumber: this.getInvoiceNumber() });
                    NumberRunner.getInvoiceNumber()
                        .then((invoiceNumber) => {
                            invoice.save()
                                .then(invoice => deferred.resolve(invoice))
                        });
                }
            });
        return deferred.promise;
    }

    deleteInvoice(invoiceNumber) {
        let deferred = q.defer();
        Invoice.find({ invoiceNumber })
            .then(invoice => {
                if (!invoice) {
                    deferred.reject(`[Delete Invoice] not found. ${invoiceNumber}`);
                }
                else {
                    //UI should block this
                    if (invoice.status != 'Completed' || invoice.status != 'Confirmed') {
                        deferred.reject(`[Delete Invoice] Completed/Confirmed. ${invoiceNumber}`);
                    }
                    else {
                        invoice.remove()
                            .then(() => deferred.resolve(`[Delete Invoice] succeed. ${invoiceNumber}`));
                    }
                }
            });
        return deferred.promise;
    }
}

module.exports = InvoiceController;