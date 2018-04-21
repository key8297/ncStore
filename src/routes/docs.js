'use strict';
var path = require('path');

module.exports.docs = (app) => {

    app.get('/docs/test', (req, res) => {
        console.log(__dirname);
        res.render(path.join(__dirname + '/docs/index.html'));
    });

}