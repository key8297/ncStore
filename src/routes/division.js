let DivisionController = require('./../controllers/division')

module.exports.division = (app) => {
    let controller = new DivisionController();

    app.post('/newdivision', (req, res) => {
        controller.create(req.body)
            .then(division => 
                {
                    console.log(division);
                    res.send(division);
                })
            .catch(error => res.status(721).send(`Error: ${error}`))
    });

    app.post('/removedivision', (req, res) => {
        controller.remove(req.body.email, req.body.password)
            .then(user => res.send(user))
            .catch(error => res.status(721).send(`Error: ${error}`))
    });
}