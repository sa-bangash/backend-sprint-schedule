var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');

authRouter.post('/login', function (req, res, next) {
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }
    jwt.sign(user, 'sc', function (err, token) {
        res.json({
            token
        })
    })
})


module.exports = authRouter;