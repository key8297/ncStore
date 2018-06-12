'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var orderLineSchema = new Schema({    
    line: Number,
    item: String,
    quantity: Number,
    price: Number,
    total: Number,
    color: String,
    size: String
  });

var orderSchema = new Schema({
    orderDate:  Date,
    invoiceDate: Date,
    orderNumber: {
      type: String,
      required: [true, "Mandatory: Order Number"],
      unique: true
    },
    division:{
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Mandatory: Division"]
    },
    name: {
      type: String,
      required: [true, "Mandatory: Name"]
    },
    email: String,
    address: String,
    tel: String,
    lines:[orderLineSchema],
    total: Number,
    status: {
        type: String,
        default: "Open"
    }
  });

orderSchema.plugin(timestamps);
var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
