'use strict';
var q = require('q');
var NumberRunner = require('./../services/numberRunner');

class OrderController {

    createOrder(newOrder) {
        let deferred = q.defer();

        NumberRunner.getOrderNumber(newOrder.division)
            .then((orderNumber) => {
                let order = Object.assign(new Order(), newOrder);
                order.save()
                    .then(order => deferred.resolve(order));
            });

        return deferred.promise;
    }

    retrieveOrders(filter) {
        let deferred = q.defer();
        Order.find(filter)
            .then(orders => deferred.resolve(orders));

        return deferred.promise;
    }

    updateOrder(order) {
        let deferred = q.defer();
        Order.find({ orderNumber: order.orderNumber })
            .then(current => {
                if (!current) {
                    deferred.reject("[Update Order] Record not found.");
                }
                else {
                    if (current.status == 'Completed' || current.status == 'Comfirmed') {
                        deferred.reject(`[Update Order] completed/confirmed. ${order.orderNumber}`);
                    }
                    else {
                        let order = Object.assign(current, order);
                        order.save()
                            .then(order => deferred.resolve(order));
                    }
                }
            });

        return deferred.promise;
    }

    deleteOrder(orderNumber) {
        let deferred = q.defer();
        Order.find({ orderNumber })
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