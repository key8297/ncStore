let UserController = require('./../controllers/user')

module.exports.userApi = (app) => {
    app.post('/signup', (req, res) => {
        let controller = new UserController();
        let q = controller.signup(req.body);

        q.then((user) => {
            res.send(user);
        },(error) => res.send(`Error: ${error}`));
    });

    app.post('/login', (req, res) => {
        let controller = new UserController();
        let q = controller.login(req.body.email, req.body.password);

        q.then((user) => {
            res.send(user);
        },(error) => res.send(`Error: ${error}`));
    });
}