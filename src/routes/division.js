let DivisionController = require('./../controllers/division')
const auth = require('../auth/auth');

module.exports.division = (app) => {
    let controller = new DivisionController();

    app.post('/newdivision', (req, res) => {
        controller.create(req.body)
            .then(division => {
                res.send(division);
            })
            .catch(error => res.status(721).send(`Error: ${error}`))
    });

    app.post('/division', auth.verifyToken, (req, res) => {
        console.log(`Retrieve division route -- ${req.body}`);
        controller.retrieve(req.body.id)
            .then(division => 
                res.send(division)
            )
            .catch(error => res.status(721).send(`Error: ${error}`))
    });

    app.post('/removedivision', auth.verifyToken, (req, res) => {
        controller.remove(req.body.email, req.body.password)
            .then(division => res.send(division))
            .catch(error => res.status(721).send(`Error: ${error}`))
    });
}