'use strict';
var q = require('q');
const InvoiceController = require('./../controllers/invoice');
// const Invoice = require('./../models/invoice');

class OrderController{

    getOrderNumber(){
        
    }

    createOrder(newOrder){
        let deffered = q.defer();
        Order.find({orderNumber : newOrder.orderNumber})
        .then(exists => {
            if(exists){
                deffered.reject("[Create Oder] already exists.");
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
        Order.find({orderNumber : order.orderNumber})
        .then(current => {
            if(!current){
                deffered.reject("[Update Order] Record not found.");
            }
            else{
                if(current.status == 'Completed' || current.status == 'Comfirmed'){
                    deffered.reject(`[Update Order] completed/confirmed. ${order.orderNumber}`);
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
                deffered.reject("[Retrieve Orders] No record found.");
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
                deffered.reject(`[Delete Order] No record found. ${orderNumber}`);
            }
            else{
                order.delete()
                .then(() => {
                    deffered.reject(`[Delete Order] record deleted. ${orderNumber}`);
                })
            }
        });
        return deffered.promise;
    }
}

module.exports = OrderController;