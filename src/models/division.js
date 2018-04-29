'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var divisionSchema = new Schema({
    code: {
        type: String,
        required: [true, "Mandatory: Code"],
        unique: true
      },
    contact: {
        type: String,
        required: [true, "Mandatory: Contact"]
      },
    collaborators:[{email:String}],
    status: String,
    address: String,
    email: String,
    phone: String
});

var Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
