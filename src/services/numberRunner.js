'use strict';
var q = require('q');
const NumberRunner = require('./../models/numberRunner');

const getNumber = (division, type) => {
    let deferred = q.defer();
    let next;

    NumberRunner.findOne({ division, type })
        .then(current => {
            if (!current) {
                current = Object.assign(new NumberRunner(), { division, type, number: 1 });
            }
            else {
                current.number++;
                current.save();
            }
            current.save()
                .then(current => deferred.resolve(current.number));
        });

    return deferred.promise;
}

module.exports = {
    getInvoiceNumber(division) {
        return getNumber(division, "Invoice");
    },

    getOrderNumber(division) {
        return getNumber(division, "Order");
    }
}