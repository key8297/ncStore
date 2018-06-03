const jwt = require('jsonwebtoken');
const secret = '3156633d-0ff5-45a1-a1f8-cc3816de7393';

module.exports = {
    sign(user) {
        let token = jwt.sign(user, secret, { expiresIn: 3600 });
        return token;
    },

    verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            
            jwt.verify(bearerToken, secret, (err, payload) => {
                if(payload){
                    req.token = bearerToken;
                    req.user = payload;
                    next();
                }
                else{
                    res.sendStatus(403);        
                }
            });
        } else {
            res.sendStatus(403);
        }
    }
}