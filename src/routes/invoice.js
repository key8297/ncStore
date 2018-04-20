'use strict';
let InvoiceController = require('./../controllers/invoice')

module.exports.invoice = (app) => {
    let controller = new InvoiceController();

    app.post('/invoice/create', (req, res) => {
        controller.create(req.body)
            .then(invoice => res.send(invoice), error => res.send(`Error: ${error}`));
    });

    app.post('/invoice/search', (req, res) => {
        controller.retrieve(req.body)
            .then(categories => res.send(categories), error => res.send(`Error: ${error}`));
    });

    app.post('/invoice/update', (req, res) => {
        controller.update(req.body)
            .then(invoice => res.send(invoice), error => res.send(`Error: ${error}`));
    });

    app.post('/invoice/createfromorder', (req, res) => {
        controller.createFromOrder(req.body.division, req.body.orderNumber)
            .then(invoice => res.send(invoice), error => res.send(`Error: ${error}`));
    });

    app.post('/invoice/delete', (req, res) => {
        controller.delete(req.body.division, req.body.invoiceNumber)
            .then(success => res.send(success), error => res.send(`Error: ${error}`));
    });
}