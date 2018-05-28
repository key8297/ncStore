'use strict';
let CategoryController = require('./../controllers/category');
const auth = require('../auth/auth');

module.exports.category = (app) => {
    
    // authRoute(app, '/category/create', (req, res) => {
    //     let controller = new CategoryController();
    //     controller.create(req.body)
    //         .then(category => res.send(category)).catch(error => res.status(400).send(`Error: ${error}`));
    // });

    app.post('/category/create', auth.verifyToken, (req, res) => {
        let controller = new CategoryController();
        controller.create(req.body)
            .then(category => res.send(category)).catch(error => res.status(400).send(`Error: ${error}`));
    });

    app.post('/category/search', auth.verifyToken, (req, res) => {
        let controller = new CategoryController();
        controller.retrieve(req.body)
            .then(categories => res.send(categories)).catch(error => res.status(400).send(`Error: ${error}`));
    });

    app.post('/category/update', auth.verifyToken, (req, res) => {
        let controller = new CategoryController();
        controller.update(req.body)
            .then(category => res.send(category)).catch(error => res.status(400).send(`Error: ${error}`));
    });

    app.post('/category/delete', auth.verifyToken, (req, res) => {
        let controller = new CategoryController();
        let params = req.body;
        controller.delete(params.division, params.code, params.includedItems)
            .then(success => res.send(success)).catch(error => res.status(400).send(`Error: ${error}`));
    });
}