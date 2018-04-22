'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  division: mongoose.Schema.Types.ObjectId,
  code: String,
  description: String,
  status: String,
  imageUrl: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
