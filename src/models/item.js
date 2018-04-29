'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var itemSchema = new Schema({    
    code: {
      type: String,
      required: [true, "Mandatory: Code"],
      unique: true
    },
    division: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Mandatory: Division"]
    },
    description: String,
    category: mongoose.Schema.Types.ObjectId,
    price: Number,
    status: String,
    thumnail: {
      type:String
    },
    thumnailName: String,
    largePhoto: {
      type:String
    },
    largePhotoName: String
  });
  
var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
