let UserController = require('./../controllers/user')

module.exports.userApi = (app) => {

    let controller = new UserController();
    let q = controller.signup(
        {
            name: "dbtester",
            email: "dbtester@gmail.com",
            password: "abc12345"
        });

    q.then((user) => {
        console.log('user', user);    
    });

    // app.post('/signup', (req, res) => {

    // });

    // app.post('/login', (req, res) => {

    // });
}