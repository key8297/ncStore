'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var categorySchema = new Schema({
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
  status: String,
  thumnail: String,
  thumnailName: String,
  largePhoto: String,
  largePhotoName: String
});

categorySchema.plugin(timestamps);
var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
