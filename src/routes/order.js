'use strict';
let OrderController = require('./../controllers/order')

module.exports.order = (app) => {
    let controller = new OrderController();

    app.post('/order/create', (req, res) => {
        controller.create(req.body)
            .then(order => res.send(order), error => res.send(`Error: ${error}`));
    });

    app.post('/order/search', (req, res) => {
        controller.retrieve(req.body)
            .then(categories => res.send(categories), error => res.send(`Error: ${error}`));
    });

    app.post('/order/update', (req, res) => {
        controller.update(req.body)
            .then(order => res.send(order), error => res.send(`Error: ${error}`));
    });

    app.post('/order/delete', (req, res) => {
        controller.delete(req.body.division, req.body.orderNumber)
            .then(success => res.send(success), error => res.send(`Error: ${error}`));
    });
}