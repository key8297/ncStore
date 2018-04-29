'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var categorySchema = new Schema({
  division:
    {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Mandatory: Division"]
    },
  code: {
    type: String,
    required: [true, "Mandatory: Code"],
    unique: true
  },
  description: String,
  status: String,
  thumnail: Buffer,
  thumnailName: String,
  largePhoto: Buffer,
  largePhotoName: String
});

categorySchema.plugin(timestamps);
var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
