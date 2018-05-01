'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var subCategorySchema = new Schema({
  code: {
    type: String,
    required: [true, "Mandatory: Code"],
    unique: true
  },
  division: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Mandatory: Division"]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Mandatory: Category"]
  },
  description: String,
  status: String,
  thumnail: String,
  thumnailName: String,
  largePhoto: String,
  largePhotoName: String
});

subCategorySchema.plugin(timestamps);
var SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
