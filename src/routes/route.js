const { userApi } = require('./user');

const routes = (app) => {
    userApi(app);
    
}

module.exports = routes; 