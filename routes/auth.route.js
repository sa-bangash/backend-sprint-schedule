var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var { User } = require('../models');
var { validationMessage, getCustomErrorObj } = require('../gernal/helper');
var generateToken = require('../config/auth.helper').generateToken;
var WorkSpaceModal = require('../models/workspace.model');
var Sequelize = require('sequelize');


// const Op = Sequelize.Op;
authRouter.post('/login', function (req, res, next) {
    User.findOne({ email: req.body.email })
        .then((resp) => {
            if (resp && req.body.password === resp.password) {
                const data = resp.toClient();
                const token = generateToken(data);
                res.json({
                    token,
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
    User.create({
        ...req.body,
    }).then(function (resp) {
        const respObj = resp.toJSON();
        delete respObj.password;
        const token = generateToken(respObj)
        res.json({
            token,
            ...respObj
        });
    }).catch(function (err) {
        res.status(406).send(validationMessage(err));
    })
})

authRouter.post('/create-work-space', function (req, res, next) {
    const workSpaceName = req.body.workSpace;
    if (req.body && !workSpaceName) {
        throw getCustomErrorObj({
            workSpace: 'Work space is Required',
        })
    }
    WorkSpaceModal.findOne({
        where: {
            name: workSpaceName,
        }
    }).then((resp) => {
        if (!resp) {
            return User.create(
                req.body,
            )
        }
        throw getCustomErrorObj({
            workSpace: 'Work space is already in use',
        })
    }).then((resp) => {
        if (resp) {
            return WorkSpaceModal.create({
                name: workSpaceName,
                userId: resp.id,
            }).then((resp) => ({ user: resp, workspace: resp }))
        }
        return false;
    }).then(function (resp) {
        if (resp) {
            return res.json(resp)
        }
        res.send('some thing going wrong')
    }).catch((err) => {

        res.status(406).send(validationMessage(err))
    })
})

module.exports = authRouter;