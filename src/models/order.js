'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderLineSchema = new Schema({    
    line: Number,
    item: String,
    quantity: Number,
    price: Number,
    total: Number
  });

var orderSchema = new Schema({
    orderNumber: String,
    division:mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    address: String,
    lines:[orderLineSchema],
    total: Number,
    status: {
        type: String,
        default: "Open"
    }
  });

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
