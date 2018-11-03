var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var UserModel = require('../models/user.model').UserModel;
var validationMessage = require('../gernal/helper').validationMessage;
var generateToken = require('../config/auth.helper').generateToken;

authRouter.post('/login', function (req, res, next) {
    UserModel.findOne({ email: req.body.email })
        .then((resp) => {
            if (resp && req.body.password === resp.password) {
                res.json({
                    token: generateToken(resp.toClient()),
                    name: resp.name,
                    email: resp.email,
                });
            } else {
                res.status(406).json({
                    email: 'You have Invalid email or password'
                });
            }
        })
        .catch((err) => res.status(403).send(err))
})

authRouter.post('/signup', function (req, res, next) {
    var newUser = new UserModel({
        ...req.body,
    })
    newUser.save().then(function (resp) {
        console.log(resp.toClient())
        res.json({
            token: generateToken(resp.toClient()),
            name: resp.name,
            email: resp.email,
        });
    }).catch(function (err) {
        res.status(406).send(err);
    })
})

authRouter.post('/create-work-space', function (req, res, next) {
    if (req.body && !req.body.workSpace) {
        return res.status(406).json({
            workSpace: 'Work space is Required',
        })
    }
    var newUser = new UserModel({
        ...req.body,
    });
    newUser.save().then(function (resp) {
        res.json({
            token: generateToken(resp.toClient()),
            name: resp.name,
            email: resp.email,
            createWorkSpace: res.createWorkSpace,
        })
    }).catch(function (err) {
        console.log(err)

        res.status(406).json(validationMessage(err.errors));
    })
})

module.exports = authRouter;