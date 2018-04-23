'use strict';
var q = require('q');
var NumberRunner = require('./../services/numberRunner');

class OrderController {

    create(order) {
        let deferred = q.defer();

        NumberRunner.getOrderNumber(newOrder.division)
            .then((orderNumber) => {
                let order = Object.assign(new Order(), order, {orderNumber});
                order.save()
                    .then(order => deferred.resolve(order));
            });

        return deferred.promise;
    }

    retrieve(filter) {
        let deferred = q.defer();
        Order.find(filter)
            .then(orders => deferred.resolve(orders));

        return deferred.promise;
    }

    update(order) {
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
                        delete order._id;
                        let data = Object.assign(current, order);
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