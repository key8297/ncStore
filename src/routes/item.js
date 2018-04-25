'use strict';
let ItemController = require('./../controllers/item')
const ObjectID = require('mongodb').ObjectID;

module.exports.item = (app) => {
    let controller = new ItemController();

    app.post('/item/create', (req, res) => {3
        controller.create(req.body)
            .then(item => {
                console.log(item);
                res.send(item);
            })
            .catch(error =>{
                console.log(error);
                res.status(701).send(`Error: ${error}`)
            });
    });

    app.post('/item/search', (req, res) => {
        controller.retrieve(req.body)
            .then(items => 
                res.send(items)
            )
            .catch(
                error => 
                res.status(701).send(`Error: ${error}`)
            );
    });

    app.post('/item/update', (req, res) => {
        controller.update(req.body)
            .then(item => res.send(item))
            .catch(error => res.status(701).send(`Error: ${error}`));
    });

    app.post('/item/delete', (req, res) => {
        controller.delete(req.body)
        .then(success => {
            res.send(success);          
        })
        .catch(error => {
            res.status(701).send(`Error: ${error}`);
        });
    });
}