const { user } = require('./user');
const { invoice } = require('./invoice');
const { order } = require('./order');
const { category } = require('./category');
const { item } = require('./item');

const routes = (app) => {
    user(app);
    invoice(app);
    order(app);
    category(app);
    item(app);
}

module.exports = routes; 