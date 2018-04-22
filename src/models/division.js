'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var divisionSchema = new Schema({
    code: String,
    contact: String,
    collaborators:[{email:String}],
    status: String,
    address: String,
    email: String,
    phone: String
});

var Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
