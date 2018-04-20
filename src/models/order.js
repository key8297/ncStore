'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    orderNumber: String,
    division:Number,
    name: String,
    email: String,
    address: String,
    lines:[{
        line: Number,
        item: String,
        quantity: Number,
        price: Number,
        total: Number
    }],
    total: Number,
    status: String
  });

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
