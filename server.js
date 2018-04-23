const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require("./src/routes/route");
const config = require('./src/config/db');
const static = require('./src/docs/static');
// var multer = require('multer');

const app = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));


// app.use(() => multer({
//     dest: './uploads/',
//     rename: (fieldname, filename) => {
//         return filename;
//     },
// }));

mongoose.connect(config.dbUrl)

app.listen(port, () => {
    static(app);
    
    // app.use((req, res, next) => {
    //     let paths = ['/signup', '/login', '/newdivision', '/division', '/removedivision'];
    //     if (!paths.includes(req.path) && !req.body.division)
    //     res.status(701).send('Error')
    //     else
    //     res.send('Ok')
    // });
    
    routes(app);
    console.log('We are live on ' + port);
});