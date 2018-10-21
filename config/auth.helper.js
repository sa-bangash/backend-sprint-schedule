var jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const basicAuthHeader = req.headers['authorization'];
    console.log(typeof basicAuthHeader);
    if (typeof basicAuthHeader !== 'undefined') {
        const tokenStr = basicAuthHeader.split(' ');
        const token = tokenStr[1];

        jwt.verify(token, 'sc', function (err, authData) {
            if (!err) {
                req.user=authData;
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

function decoredToken(req) {
    const basicAuthHeader = req.headers['authorization'];
    if (typeof basicAuthHeader !== 'undefined') {
        const tokenStr = basicAuthHeader.split(' ');
        const token = tokenStr[1];
        console.log('-----------------');
        return jwt.verify(token, 'sc')
    }
    return null;
}
module.exports = {
    verifyToken: verifyToken,
    generateToken: generateToken,
    decoredToken: decoredToken,
}