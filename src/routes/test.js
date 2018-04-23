const fileUpload = require('express-fileupload');
const Image = require('./../models/image')

module.exports.test = (app) => {
    app.use(fileUpload());    
    app.post('/upload', function (req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        let image = Object.assign(new Image(), req.files.data);
        image.save()
        .then(i => res.send(i))
        .catch(err => res.send(err));
    });
}