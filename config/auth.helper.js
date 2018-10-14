var jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const basicAuthHeader = req.headers['authorization'];
    console.log(typeof basicAuthHeader);
    if (typeof basicAuthHeader !== 'undefined') {
        const tokenStr = basicAuthHeader.split(' ');
        const token = tokenStr[1];

        jwt.verify(token, 'sc', function (err, authData) {
            if (!err) {
                next();
            } else {
                res.status(403).send("You are not allowed");
            }
        })
    } else {

        res.status(403).send("You are not allowed");
    }
}

function generateToken(user) {
    return jwt.sign(user, 'sc');
}

module.exports = {
    verifyToken: verifyToken,
    generateToken: generateToken,
}