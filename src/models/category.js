'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  division: mongoose.Schema.Types.ObjectId,
  code: String,
  description: String,
  status: String,
  thumnail: Buffer,
  thumnailName: String,
  largePhoto: Buffer,
  largePhotoName: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
