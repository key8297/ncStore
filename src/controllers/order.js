'use strict';
var q = require('q');
const InvoiceController = require('./../controllers/invoice');
// const Invoice = require('./../models/invoice');

class OrderController{
    createOrder(newOrder){
        let deffered = q.defer();
        Order.find({orderNumber : newOrder.OrderNumber})
        .then(exists => {
            if(exists){
                deffered.reject("Record already exists.");
            }
            else{
                let order = Object.assign(new Order(), newOrder);
                order.save()
                .then(order => {
                    deffered.resolve(order);
                });                
            }
        });
        return deffered.promise;
    }

    updateOrder(order){
        let deffered = q.defer();
        Order.find({orderNumber : order.OrderNumber})
        .then(current => {
            if(!current){
                deffered.reject("Record not found.");
            }
            else{
                //UI should block this
                if(current.status == 'Completed' || current.status == 'Comfirmed'){
                    //deffered.reject(`Order ${current.status} can not be delete.`);
                }
                else{
                    let order = Object.assign(current, order);
                    order.save()
                    .then(order => {
                        deffered.resolve(order);
                    });                   
                }
            }
        });
        return deffered.promise;
    }

    retrieveOrders(filter){
        let deffered = q.defer();
        Order.find(filter)
        .then(orders => {
            if(!orders){
                deffered.reject("No record found.");
            }
            else{
                deffered.resolve(orders);
            }
        });
        return deffered.promise;
    }

    deleteOrder(orderNumber){
        let deffered = q.defer();
        Order.find({orderNumber})
        .then(orders => {
            if(!orders){
                deffered.reject("No record found.");
            }
            else{
                order.delete()
                .then(() => {
                    deffered.resolve(`Order: {} removed.`);
                })
            }
        });
        return deffered.promise;
    }
}

module.exports = OrderController;