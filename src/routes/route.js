const { user } = require('./user');
const { invoice } = require('./invoice');
const { order } = require('./order');
const { category } = require('./category');
const { item } = require('./item');
const { division } = require('./division');
const { validation } = require('./validation');


const routes = (app) => {

    validation(app);
    user(app);
    invoice(app);
    order(app);
    category(app);
    item(app);
    division(app);
}

module.exports = routes; 