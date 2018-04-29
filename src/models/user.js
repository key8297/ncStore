'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Mandatory: Name"],
  },
  email: {
    type: String,
    required: [true, "Mandatory: Email"],
    unique: true    
  },
  password: {
    type: String,
    required: [true, "Mandatory: Password"],
  },
  mainDivision: mongoose.Schema.Types.ObjectId,
  isSeller: Boolean,
  divisions: [{ division: mongoose.Schema.Types.ObjectId }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;


// validate: {
//   validator: function(v) {
//     return /\d{3}-\d{3}-\d{4}/.test(v);
//   },
//   message: '{VALUE} is not a valid phone number!'
// }