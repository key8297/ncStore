'use strict';
let ItemController = require('./../controllers/item');
//const ObjectID = require('mongodb').ObjectID;
const auth = require('../auth/auth');

module.exports.item = (app) => {
    let controller = new ItemController();

    app.post('/item/create', auth.verifyToken, (req, res) => {
        controller.create(req.body)
            .then(item => {
                console.log(item);
                res.send(item);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(`Error: ${error}`)
            });
    });

    app.post('/item/search', auth.verifyToken, (req, res) => {
        controller.retrieve(req.body, req.query)
            .then(items =>
                res.send(items)
            )
            .catch(
                error =>
                    res.status(400).send(`Error: ${error}`)
            );
    });

    app.post('/item/update', auth.verifyToken, (req, res) => {
        controller.update(req.body)
            .then(item => res.send(item))
            .catch(error => res.status(400).send(`Error: ${error}`));
    });

    app.post('/item/delete', auth.verifyToken, (req, res) => {
        controller.delete(req.body)
            .then(success => {
                res.send(success);
            })
            .catch(error => {
                res.status(400).send(`Error: ${error}`);
            });
    });

    app.get('/item/image', (req, res) => {

        let item = req.query.item;
        let large = req.query.large;
        //let division = req.user.division;
        let division;
        controller.image(division, item, large)
            .then(success => {

                let img = new Buffer(success, 'base64');

                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': img.length
                });
                res.end(img);
            })
            .catch(error => {
                res.status(400).send(`Error: ${error}`);
            });
    });

}