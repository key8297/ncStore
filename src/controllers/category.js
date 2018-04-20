'use strict';
var q = require('q');
const Category = require('./../models/category');
const Item = require('./../models/item');

class CategoryController {

    createCategory(category) {
        let deferred = q.defer();
        Category.findOne({ division: category.division, id: category.id })
            .then(existingCategory => {
                if (existingCategory) {
                    deferred.reject(`[Create Category] already exists.`);
                }
                else {
                    let data = Object.assign(new Category(), category);
                    data.save()
                        .then(category => deferred.resolve(category));
                }
            });
        return deferred.promise;
    }

    retrieveCategory(filter) {
        let deferred = q.defer();
        Category.find(filter)
            .then(categories => {
                deferred.resolve(categories);
            });
        return deferred.promise;
    }

    updateCategory(category) {
        let deferred = q.defer();
        Category.find({ division: category.division, id: category.id })
            .then(current => {
                if (!current) {
                    deferred.reject(`[Update Category] Record not found. ${category.code}`);
                }
                else {
                    let category = Object.assign(current, category);
                    category.save()
                        .then(category => {
                            deferred.resolve(category);
                        });
                }
            });
        return deferred.promise;
    }

    deleteCategory(code, includeItem = 1) {
        let deferred = q.defer();
        Category.find({ code })
            .then(category => {
                if (!category) {
                    deferred.reject(`[Delete Category] not found. ${invoiceNumber}`);
                }
                else {
                    Item.find({ division: category.division, category: category.id })
                        .then(items => {
                            if (items && !includeItem) {
                                deferred.reject(`[Delete Category] linked to items. ${code}`);
                            }
                            else if (items && includeItem) {
                                Item.remove(items)
                                    .then(() => {
                                        category.remove()
                                            .then(() => {
                                                deferred.resolve(`[Delete Category] succeed. ${code}`);
                                            })
                                    })
                            }
                            else if (!items) {
                                category.remove()
                                    .then(() => {
                                        deferred.resolve(`[Delete Category] succeed. ${code}`);
                                    })
                            }
                        })
                }
            });
        return deferred.promise;
    }
}

module.exports = CategoryController;