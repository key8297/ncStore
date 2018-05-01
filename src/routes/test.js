const fileUpload = require('express-fileupload');
const Item = require('./../models/item');
const Category = require('./../models/category');
const SubCategory = require('./../models/subCategory');
const ObjectID = require('mongodb').ObjectID;
var fs = require('fs');

module.exports.test = (app) => {

    app.use(fileUpload());

    app.get('/installtemplatedatabase/category', (req, res) => {
        let path = __dirname + "/../template/categories.json";

        fs.readFile(path, 'utf8', function (err, data) {
            let categtories = JSON.parse(data);
            categtories.map(cat => {
                let cc = new Category(Object.assign(cat, { division: new ObjectID('5adc0032dd1e8a2814ff2cb0') }));
                cc.save();
            });
        })

        res.send("Done");
    });

    app.get('/installtemplatedatabase/subcategory', (req, res) => {
        let path = __dirname + "/../template/subcategories.json";

        fs.readFile(path, 'utf8', function (err, data) {
            let subcategtories = JSON.parse(data);

            subcategtories.map(subcat => {
                Category.findOne({ code: subcat.category })
                    .then(cat => {
                        let cc = new SubCategory(Object.assign(subcat, { division: new ObjectID('5adc0032dd1e8a2814ff2cb0'), category: cat._id }));
                        cc.save();
                    });
            });
        })

        res.send("Done");
    });

    app.get('/installtemplatedatabase/items', (req, res) => {
        let path = __dirname + "/../template/items.json";

        fs.readFile(path, 'utf8', function (err, data) {
            let items = JSON.parse(data);

            items.map(item => {
                SubCategory.findOne({ code: item.subCategoryCode })
                    .then(subcat => {
                        let cc = new Item(Object.assign(item, { division: new ObjectID('5adc0032dd1e8a2814ff2cb0'), category: subcat.category, subCategory: subcat._id }));
                        cc.save();
                    });
            });
        })

        res.send("Done");
    });

    app.get('/action', function (req, res) {



        // let path=  __dirname + "/../temp1/" ;
        // fs.readFile(path + "mb_shoes_large.gif", 'base64', (err, data) => {  
        //     res.send(data)
        // });
        Category.find({})
            .then(cats => {
                cats.map(cat => {
                    let path = __dirname + "/../categories/" + cat.description + ".jpg";
                    let newData = {};
                    fs.readFile(path, "base64", (err, data) => {
                        cat.thumnail = data;
                        cat.thumnailName = cat.description + ".jpg"
                        cat.largePhoto = data;
                        cat.largePhotoName = cat.description + ".jpg"
                        cat.save();
                    });
                });
            });
        res.send("Done");
    });
}