var jwt = require('jsonwebtoken');
module.exports = function verifyToken(req, res, next) {
    const basicAuthHeader = req.headers['authorization'];
    if (typeof basicAuthHeader !== 'undefined') {
        const tokenStr = basicAuthHeader.split(' ');
        const token = tokenStr[1];
        jwt.verify(token, 'sc', function (err, authData) {
            if (!err) {
                next();
            } else {
                res.sendStatus(403)
            }
        })
    } else {
        res.sendStatus(403);
    }
}