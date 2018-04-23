const { user } = require('./user');
const { invoice } = require('./invoice');
const { order } = require('./order');
const { category } = require('./category');
const { item } = require('./item');
const { division } = require('./division');
const { test } = require('./test');

const routes = (app) => {
    
    test(app);
    user(app);
    division(app);    
    invoice(app);
    order(app);
    category(app);
    item(app);
}

module.exports = routes; 