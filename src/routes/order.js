'use strict';
let OrderController = require('./../controllers/order')

module.exports.order = (app) => {
    let controller = new OrderController();

    app.post('/order/create', (req, res) => {
        controller.create(req.body)
        .then(order => {
            console.log(order);
            res.send(order);
        })
        .catch(error =>{
            console.log(error);
            res.status(701).send(`Error: ${error}`)
        });
    });

    app.post('/order/search', (req, res) => {
        controller.retrieve(req.body)
        .then(orders => {
            console.log(orders);
            if(orders.length == 1)
                res.send(orders[0])
            else
                res.send(orders);
        })
        .catch(error =>{
            console.log(error);
            res.status(701).send(`Error: ${error}`)
        });
    });

    app.post('/order/update', (req, res) => {
        controller.update(req.body)
        .then(order => {
            console.log(order);
            res.send(order);
        })
        .catch(error =>{
            console.log(error);
            res.status(701).send(`Error: ${error}`)
        });
    });

    app.post('/order/delete', (req, res) => {
        controller.delete(req.body.division, req.body.orderNumber)
        .then(success => {
            res.send(success);          
        })
        .catch(error => {
            res.status(701).send(`Error: ${error}`);
        });
    });
}