const fileUpload = require('express-fileupload');
const Image = require('./../models/image')

module.exports.test = (app) => {
    app.use(fileUpload());
    console.log("Here");
    app.post('/upload', function (req, res) {
        // if (!req.files)
        //     return res.status(400).send('No files were uploaded.');

        let image = Object.assign(new Image(), req.body);
        image.save()
            .then(i => {
                console.log('success');
                res.send(i);
            }
            )
            .catch(err => {
                console.log('fail');
                res.send(err)
            }
            );
    });
}