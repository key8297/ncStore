'use strict';
var q = require('q');
const Order = require('./../models/order');
const Invoice = require('./../models/invoice');

class InvoiceController {

    getInvoiceNumber() {
        return 111;
    }

    createInvoice(newInvoice) {
        let deffered = q.defer();
        Invoice.find({ invoiceNumber: newInvoice.invoiceNumber })
            .then(exists => {
                if (exists) {
                    deffered.reject("Record already exists.");
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
        Invoice.find({invoiceNumber : invoice.OrderNumber})
        .then(current => {
            if(!current){
                deffered.reject("Record not found.");
            }
            else{
                if(current.status == 'Completed' || current.status == 'Comfirmed'){
                    deffered.reject(`Order ${current.status}`);
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
                    deferred.reject("Order not found.");
                }
                else if (order.status == "Completed") {
                    deferred.reject(`Order in status: ${order.status} can not be invoice.`);
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
                deffered.reject("No record found.");
            }
            else{
                //UI should block this
                if(invoice.status != 'Completed'){
                    //deffered.reject(`Invoice ${current.status} can not be delete.`);
                }
                else if(invoice.status != 'Confirmed'){
                    //
                    //deffered.reject(`Invoice ${current.status} can not be delete.`);
                }
                invoice.delete()
                .then(() => {
                    deffered.resolve(`Invoice ${current.status} can not be delete.`);
                })
            }
        });
        return deffered.promise;
    }
}

module.exports = InvoiceController;