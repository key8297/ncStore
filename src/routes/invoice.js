'use strict';
let InvoiceController = require('./../controllers/invoice');
const auth = require('../auth/auth');

module.exports.invoice = (app) => {
    let controller = new InvoiceController();

    app.post('/invoice/create', auth.verifyToken, (req, res) => {
        controller.create(req.body)
            .then(invoice => {
                console.log(invoice);
                res.send(invoice);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(`Error: ${error}`)
            });
    });

    app.post('/invoice/search', auth.verifyToken, (req, res) => {
        controller.retrieve(req.body)
            .then(invoices => {
                if (invoices.length == 1)
                    res.send(invoices[0])
                else
                    res.send(invoices);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(`Error: ${error}`)
            });
    });

    app.post('/invoice/update', auth.verifyToken, (req, res) => {
        controller.update(req.body)
            .then(invoice => {
                console.log(invoice);
                res.send(invoice);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(`Error: ${error}`)
            });
    });

    app.post('/invoice/createfromorder', auth.verifyToken, (req, res) => {
        controller.createFromOrder(req.body)
            .then(invoice => {
                console.log(invoice);
                res.send(invoice);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(`Error: ${error}`)
            });
    });

    app.post('/invoice/delete', auth.verifyToken, (req, res) => {
        controller.delete(req.body.division, req.body.invoiceNumber)
            .then(success => {
                res.send(success);
            })
            .catch(error => {
                res.statusText = `Error: ${error}`;
                res.status(400).send(`Error: ${error}`);
            });
    });
}