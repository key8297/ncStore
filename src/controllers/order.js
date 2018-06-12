'use strict';
var q = require('q');
const Order = require('./../models/order');
const Number = require('./../services/numberRunner');

const calculateOrder = (order) => {

    let total = 0;
    order.lines.map(line => {
        line.total = line.price * line.quantity;
        total += line.total;
    });

    order.total = total;

    return order;
}

class OrderController {

    create(order) {
        let deferred = q.defer();
        Number.getOrderNumber(order.division)
            .then((orderNumber) => {
                order = Object.assign(new Order(), calculateOrder(order), {orderNumber});
                order.save()
                    .then(order => deferred.resolve(order))
                    .catch(err => console.log('Error on save order', err));
            });

        return deferred.promise;
    }

    retrieve(filter) {
        let deferred = q.defer();
        Order.find(filter)
            .then(orders => deferred.resolve(orders));

        return deferred.promise;
    }

    confirm(_id){
        let deferred = q.defer();
        Order.findOne({ _id })
            .then(current => {
                if (!current) {
                    deferred.reject("[Update Order] Record not found.");
                }
                else {
                    if (current.status == 'Completed' || current.status == 'Comfirmed') {
                        deferred.reject(`[Update Order] completed/confirmed. ${order.orderNumber}`);
                    }
                    else {
                        let data = Object.assign(current, {status:'Confirmed'});
                        data.save()
                            .then(order => deferred.resolve(order));
                    }
                }
            });

        return deferred.promise;
    }

    update(order) {
        let deferred = q.defer();
        Order.findOne({ division: order.division, _id: order._id })
            .then(current => {
                if (!current) {
                    deferred.reject("[Update Order] Record not found.");
                }
                else {
                    if (current.status == 'Completed' || current.status == 'Comfirmed') {
                        deferred.reject(`[Update Order] completed/confirmed. ${order.orderNumber}`);
                    }
                    else {
                        delete order._id;
                        let data = Object.assign(current, calculateOrder(order));
                        data.save()
                            .then(order => deferred.resolve(order));
                    }
                }
            });

        return deferred.promise;
    }

    delete(order) {
        let deferred = q.defer();
        Order.findOne({ division: order.division, _id: order._id })
            .then(orders => {
                if (!orders) {
                    deferred.reject(`[Delete Order] No record found. ${orderNumber}`);
                }
                else {
                    order.remove()
                        .then(() => deferred.reject(`[Delete Order] record deleted. ${orderNumber}`));
                }
            });

        return deferred.promise;
    }
}

module.exports = OrderController;