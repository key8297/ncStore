'use strict';
var q = require('q');
const Order = require('./../models/order');
const Invoice = require('./../models/invoice');

class InvoiceController {

    getInvoiceNumber() {
    }

    createInvoice(newInvoice) {
        let deffered = q.defer();
        Invoice.find({ invoiceNumber: newInvoice.invoiceNumber })
            .then(exists => {
                if (exists) {
                    deffered.reject(`[Create Invoice] Record already exists. ${newInvoice.invoiceNumber}`);
                }
                else {
                    let invoice = Object.assign(new Invoice(), newInvoice, { invoiceNumber: getInvoiceNumber });
                    invoice.save()
                        .then(invoice => {
                            deffered.resolve(invoice);
                        });
                }
            });
        return deffered.promise;
    }

    updateInvoice(invoice) {
        let deffered = q.defer();
        Invoice.find({invoiceNumber : invoice.invoiceNumber})
        .then(current => {
            if(!current){
                deffered.reject(`[Update Invoice] Record not found. ${invoice.invoiceNumber}`);
            }
            else{
                if(current.status == 'Completed' || current.status == 'Comfirmed'){
                    deffered.reject(`[Update Invoice] Confirmed/Completed. ${invoice.invoiceNumber}`);
                }
                else{
                    let invoice = Object.assign(current, invoice);
                    invoice.save()
                    .then(invoice => {
                        deffered.resolve(invoice);
                    });                   
                }
            }
        });
        return deffered.promise;
    }

    createInvoiceFromOrder(orderNumber) {
        let deferred = q.defer();
        Order.find({ orderNumber })
            .then(order => {
                if (!order) {
                    deffered.reject(`[Create Invoice From Order] (order not found) ${orderNumber}`);
                }
                else if (order.status == "Completed") {
                    deffered.reject(`[Create Invoice From Order] (order completed) ${orderNumber}`);
                }
                else if (order.status == "Open" || order.status == "Confirmed") {
                    let invoice = Object.assign(new Invoice(), orderNumber, { invoiceNumber: this.getInvoiceNumber() });
                    invoice.invoiceNumber = "1234";
                    invoice.save()
                        .then(invoice => {
                            deferred.resolve(invoice);
                        });
                }
            });
        return deferred.promise;
    }

    deleteInvoice(invoiceNumber){
        let deffered = q.defer();
        Invoice.find({invoiceNumber})
        .then(invoice => {
            if(!invoice){
                deffered.reject( `[Delete Invoice] not found. ${invoiceNumber}`); 
            }
            else{
                //UI should block this
                if(invoice.status != 'Completed' || invoice.status != 'Confirmed'){
                    deffered.reject( `[Delete Invoice] Completed/Confirmed. ${invoiceNumber}`);                    
                }

                invoice.delete()
                .then(() => {
                    deffered.resolve(`[Delete Invoice] succeed. ${current.status}`);
                })
            }
        });
        return deffered.promise;
    }
}

module.exports = InvoiceController;