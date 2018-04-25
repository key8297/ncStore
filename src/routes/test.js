const fileUpload = require('express-fileupload');
const Item = require('./../models/item');
var fs = require('fs');

module.exports.test = (app) => {
    app.use(fileUpload());
    
    app.get('/action', function (req, res) {

        // let path=  __dirname + "/../temp1/" ;
        // fs.readFile(path + "mb_shoes_large.gif", 'base64', (err, data) => {  
        //     res.send(data)
        // });
        Item.find({})
        .then(items => {
            items.map(item => {
                let path=  __dirname + "/../temp1/" ;
                let newData = {};
                fs.readFile(path + item.thumnailName, "base64", (err, data) => {  
                    item.thumnail = data;
                    item.save();
                });
                fs.readFile(path + item.largePhotoName, "base64", (err, data) => {  
                    item.largePhoto = data;
                    item.save();
                });
            });
        });
        res.send("Done");
    });
}