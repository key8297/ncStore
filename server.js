const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require("./src/routes/route")
const config = require('./src/config/db')

const app = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));

mongoose.connect(config.dbUrl)

app.listen(port, () => {

    routes(app);
    console.log('We are live on ' + port);
});