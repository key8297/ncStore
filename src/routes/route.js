const { userApi } = require('./user');

const routes = (app) => {
    // app.get('/question', (req, res) => {
    //     res.send("Test");
    // })

    userApi(app);
    
}

module.exports = routes; 