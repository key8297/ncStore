'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({    
    code: String,
    division: Number,
    description: String,
    category: Number,
    price: Number,
    status: String,
    imageUrl: String
  });

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
