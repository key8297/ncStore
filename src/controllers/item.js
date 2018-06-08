'use strict';
var q = require('q');
const Item = require('./../models/item');

class ItemController {

    create(item) {
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

    retrieve(filter,params) {
        let count = parseInt(params.count) || 10;
        let largePhoto = params.largePhoto;
        let thumnail = params.thumnail;
        let skip = parseInt(params.skip) || 0;

        let deferred = q.defer();

        let includeFields = ""; 
        if(!thumnail){
            includeFields+= "-thumnail ";
        }

        if(!largePhoto){
            includeFields+= "-largePhoto ";
        }

        Item.find(filter).limit(count).select(includeFields).skip(skip)
            .then(items => {
                    deferred.resolve(items)
                });
        return deferred.promise;
    }

    update(item) {
        let deferred = q.defer();
        Item.findOne({ division: item.division, _id: item._id })
            .then(current => {
                if (!current) {
                    deferred.reject(`[Update Item] Record not found. ${item.code}`);
                }
                else {
                    delete item._id;
                    let data = Object.assign(current, item);
                    data.save()
                        .then(item => deferred.resolve(item));
                }
            });
        return deferred.promise;
    }

    delete(item) {
        let deferred = q.defer();
        let code = item.code;
        Item.findOne({ division: item.division, _id: item._id })
            .then(item => {
                if (!item) {
                    deferred.reject(`[Delete Item] not found. ${code}`);
                }
                else {
                    Item.remove(item)
                        .then(() => deferred.resolve(`[Delete item] succeed. ${code}`))
                }
            });
        return deferred.promise;
    }

    image(division, item, large) {
        let deferred = q.defer();
        let field = (large)? 'largePhoto': 'thumnail';
        Item.findOne({_id:item},field)
        .then(item => {
            deferred.resolve(item[field]);
        });
        return deferred.promise;
    }
}

module.exports = ItemController;