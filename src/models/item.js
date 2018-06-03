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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Mandatory: Category"]
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Mandatory: Sub category"]
  },
  price: Number,
  status: String,
  thumnail: {
    type: String
  },
  thumnailName: String,
  largePhoto: {
    type: String
  },
  images:[],
  sizes:[],
  colors:[],
  similarItems:[],
  largePhotoName: String
});

itemSchema.plugin(timestamps);
var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
