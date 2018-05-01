'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var orderLineSchema = new Schema({    
    line: Number,
    item: String,
    quantity: Number,
    price: Number,
    total: Number
  });

var orderSchema = new Schema({
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
    lines:[orderLineSchema],
    total: Number,
    status: {
        type: String,
        default: "Open"
    }
  });

categorySchema.plugin(timestamps);
var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
