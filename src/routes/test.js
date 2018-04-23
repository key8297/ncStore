const User = require('./../models/user')
const fs = require('fs');

module.exports.test = (app) => {

    app.post('/uploadimage', (req, res) => {
        var image = new Image();
        image.data = fs.readFileSync(req.files.userPhoto.path)
        image.contentType = 'image/png';
        image.save();
    });

    app.post('/retrieveimage', (req, res) => {

    });


}