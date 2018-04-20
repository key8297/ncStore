'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,    
    email: String,
    password: String,
    mainDivision:Number,
    divisions:[]
  });

var User = mongoose.model('User', userSchema);

module.exports = User;
