'use strict';
let ItemController = require('./../controllers/item')
const ObjectID = require('mongodb').ObjectID;
const auth = require('../auth/auth');

module.exports.item = (app) => {
    let controller = new ItemController();

    app.post('/item/create', auth.verifyToken, (req, res) => {3
        controller.create(req.body)
            .then(item => {
                console.log(item);
                res.send(item);
            })
            .catch(error =>{
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
        let item = req.param('item');
        let large = req.param('large');
        let division = req.param('division');
        controller.image(item, division, large)
        .then(success => {
            res.send(success);          
        })
        .catch(error => {
            res.status(400).send(`Error: ${error}`);
        });
    });


}