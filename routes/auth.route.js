var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var UserModel = require('../models/user.model');

var generateToken = require('../config/auth.helper').generateToken;

authRouter.post('/login', function (req, res, next) {
    UserModel.findOne({ email: req.body.email })
        .then((resp) => {
            if (resp && req.body.password === resp.password) {
                res.json({
                    token: generateToken(req.body),
                    name: resp.name,
                    email: resp.email,
                });
            } else {
                res.status(403).send('You have Invalid email or password');
            }
        })
        .catch((err) => res.error(err))
})

authRouter.post('/signup', function (req, res, next) {
    var newUser = new UserModel({
        ...req.body,
    })
    newUser.save().then(function (resp) {
        res.json({
            token: generateToken(req.body),
            name: resp.name,
            email: resp.email,
        });
    }).catch(function (err) {
        res.status(403).send(err);
    })
})



module.exports = authRouter;