'use strict';
var q = require('q');
const Item = require('./../models/item');

class ItemController {

    createItem(item) {
        let deferred = q.defer();
        Item.findOne({ division: item.division, code: item.code })
            .then(existingItem => {
                if (existingItem) {
                    deferred.reject(`[Create Item] already exists.`);
                }
                else {
                    let data = Object.assign(new Item(), item);
                    data.save()
                        .then(item => deferred.resolve(item));
                }
            });
        return deferred.promise;
    }

    retrieveItems(filter) {
        let deferred = q.defer();
        Item.find(filter)
            .then(items => deferred.resolve(items));
        return deferred.promise;
    }

    updateItem(item) {
        let deferred = q.defer();
        Item.find({ division: item.division, code: item.code })
            .then(current => {
                if (!current) {
                    deferred.reject(`[Update Item] Record not found. ${item.code}`);
                }
                else {
                    let item = Object.assign(current, item);
                    item.save()
                        .then(item => deferred.resolve(item));
                }
            });
        return deferred.promise;
    }

    deleteItem(code) {
        let deferred = q.defer();
        Item.find({ code })
            .then(item => {
                if (!item) {
                    deferred.reject(`[Delete Item] not found. ${code}`);
                }
                else {
                    item.remove()
                        .then(() => deferred.resolve(`[Delete item] succeed. ${code}`))
                }
            });
        return deferred.promise;
    }
}

module.exports = ItemController;