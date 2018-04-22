'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
    division: mongoose.Schema.Types.ObjectId,
    invoiceNumber: String,
    orderNumber: String,
    name: String,
    email: String,
    address: String,
    lines: [{
        line: Number,
        item: String,
        quantity: Number,
        price: Number,
        total: Number
    }],
    total: Number,
    status: String
});

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
