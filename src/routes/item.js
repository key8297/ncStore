'use strict';
let ItemController = require('./../controllers/item')

module.exports.item = (app) => {
    let controller = new ItemController();

    app.post('/item/create', (req, res) => {
        controller.create(req.body)
            .then(item => res.send(item), error => res.send(`Error: ${error}`));
    });

    app.post('/item/search', (req, res) => {
        controller.retrieve(req.body)
            .then(categories => res.send(categories), error => res.send(`Error: ${error}`));
    });

    app.post('/item/update', (req, res) => {
        controller.update(req.body)
            .then(item => res.send(item), error => res.send(`Error: ${error}`));
    });

    app.post('/item/delete', (req, res) => {
        controller.delete(req.body.division, req.body.code)
            .then(success => res.send(success), error => res.send(`Error: ${error}`));
    });
}