var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var UserModel = require('../models/user.model');

var generateToken = require('../config/auth.helper').generateToken;

authRouter.post('/login', function (req, res, next) {
    UserModel.findOne({ email: req.body.email })
        .then((resp) => {
            if (resp && req.body.password === resp.password) {
                return generateToken(req.body)
            } else {
                res.send('You have Invalid email or password');
            }
        })
        .then((resp) => {
            res.json({ token: resp });
        })
        .catch((err) => res.error(err))
})

authRouter.post('/signup', function (req, res, next) {
    var newUser = new UserModel({
        ...req.body,
    })
    newUser.save().then(function (resp) {
        return generateToken(req.body)
    }).then(function (resp) {
        res.setHeader('Authurization', `basic ${resp}`)
        res.send({ token: resp });
    }).catch(function (err) {
        res.status(403).send(err);
    })
})



module.exports = authRouter;