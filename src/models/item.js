'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({    
    code: String,
    division: mongoose.Schema.Types.ObjectId,
    description: String,
    category: mongoose.Schema.Types.ObjectId,
    price: Number,
    status: String,
    thumnail: String,
    thumnailName: String,
    largePhoto: String,
    largePhotoName: String
  });
  
var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
