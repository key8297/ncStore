'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceLineSchema = new Schema({    
    line: Number,
    item: String,
    quantity: Number,
    price: Number,
    total: Number
  });

var invoiceSchema = new Schema({
    division: mongoose.Schema.Types.ObjectId,
    invoiceNumber: String,
    orderNumber: String,
    name: String,
    email: String,
    address: String,
    lines:[invoiceLineSchema],
    total: Number,
    status: {
        type: String,
        default: "Open"
    }
});

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
