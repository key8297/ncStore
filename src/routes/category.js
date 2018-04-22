'use strict';
let CategoryController = require('./../controllers/category')

module.exports.category = (app) => {
    let controller = new CategoryController();

    app.post('/category/create', (req, res) => {
        controller.create(req.body)
            .then(category => res.send(category)).catch(error => res.status(701).send(`Error: ${error}`));
    });

    app.post('/category/search', (req, res) => {
        controller.retrieve(req.body)
            .then(categories => res.send(categories)).catch(error => res.status(701).send(`Error: ${error}`));
    });

    app.post('/category/update', (req, res) => {
        controller.update(req.body)
            .then(category => res.send(category)).catch(error => res.status(701).send(`Error: ${error}`));
    });

    app.post('/category/delete', (req, res) => {
        let params = req.body;
        controller.delete(params.division, params.code, params.includedItems)
            .then(success => res.send(success)).catch(error => res.status(701).send(`Error: ${error}`));
    });
}