'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var divisionSchema = new Schema({
    id: Number,
    code: String,
    contact: String,
    collaborators:[],
    status: String,
    address: String
});

var Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
