const User = require('./../models/user')

module.exports.test = (app) => {

    app.get('/test2', (req, res) => {
        User.find({}).limit(1)
        .then(user => res.send(user));
    });

}