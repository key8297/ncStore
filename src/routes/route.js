const { user } = require('./user');
const { invoice } = require('./invoice');
const { order } = require('./order');
const { category } = require('./category');
const { item } = require('./item');
//const { docs } = require('./docs');
const { division } = require('./division');

const routes = (app) => {
//   docs(app);
    user(app);
    invoice(app);
    order(app);
    category(app);
    item(app);
    division(app);
}

module.exports = routes; 