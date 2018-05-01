'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var invoiceLineSchema = new Schema({
    line: Number,
    item: {
        type: String,
        required: [true, "Mandatory: Code"]
      },
    quantity: {
        type: Number,
        required: [true, "Mandatory: Quantity"]
      },
    price: {
        type: Number,
        required: [true, "Mandatory: Price"]
      },
    total: Number
}, { _id: false });

var invoiceSchema = new Schema({
    division: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Mandatory: Division"]
      },
    invoiceNumber: {
        type: String,
        required: [true, "Mandatory: Invoice Number"],
        unique: true
      },
    orderNumber: String,
    name: {
        type: String,
        required: [true, "Mandatory: Name"]
      },
    email: String,
    address: String,
    lines: [invoiceLineSchema],
    total: Number,
    status: {
        type: String,
        default: "Open"
    }
});

invoiceSchema.virtual('getLines')
    .get(() => {
        return this.lines;
    });

invoiceSchema.plugin(timestamps);
var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
