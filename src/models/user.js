'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  mainDivision: mongoose.Schema.Types.ObjectId,
  isSeller: Boolean,
  divisions: [{ division: mongoose.Schema.Types.ObjectId }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
