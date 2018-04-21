const express = require('express');
const path = require('path');

const static = (app) => {
    console.log(__dirname); 
    app.use('/docs', express.static(__dirname))
    app.get('/docs/test', (req, res) => {
        res.sendFile(path.join(__dirname + '/react.html'));
    });

}

module.exports = static; 