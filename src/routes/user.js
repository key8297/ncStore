let UserController = require('./../controllers/user')

module.exports.user = (app) => {
    let controller = new UserController();

    app.post('/signup', (req, res) => {
        controller.signup(req.body)
            .then(user => res.send(user))
            .catch(error => res.status(721).send(`Error: ${error}`))
    });

    app.post('/login', (req, res) => {
        controller.login(req.body.email, req.body.password)
            .then(user => res.send(user))
            .catch(error => res.status(721).send(`Error: ${error}`))
    });
}