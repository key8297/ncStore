'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var numberRunnerSchema = new Schema({
  division: mongoose.Schema.Types.ObjectId,
  type: String,
  number: Number
});

var NumberRunner = mongoose.model('NumberRunner', numberRunnerSchema);

module.exports = NumberRunner;
