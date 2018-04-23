'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    data: Buffer,
    contentType: String,
    name: String
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;