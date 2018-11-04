var express = require('express');
var authRouter = express.Router();
var jwt = require('jsonwebtoken');
var { UserModel, USER_ROLE } = require('../models/user.model');
var validationMessage = require('../gernal/helper').validationMessage;
var generateToken = require('../config/auth.helper').generateToken;
var WorkSpaceModal = require('../models/workspace.model').WorkSpaceModal;
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
    const workSpaceName = req.body.workSpace;
    if (req.body && !workSpaceName) {
        return res.status(406).json({
            workSpace: 'Work space is Required',
        })
    }
    var newUser = new UserModel({
        ...req.body,
    });
    WorkSpaceModal.findOne({ name: workSpaceName })
        .then(function (resp) {
            if (!resp) {
                return true;
            }
            throw { workSpace: 'Work space is already Exsit' }
        }).then(function () {
            return newUser.save()
        }).then(function (resp) {
            const newWorkSpace = new WorkSpaceModal({
                name: workSpaceName,
                users: [{
                    id: resp._id,
                    role: [USER_ROLE.Admin]
                }]
            })
            return newWorkSpace.save().then((wkSpace) => {
                return {
                    workSpace: wkSpace,
                    user:resp.toClient()
                }
            })
        }).then(function (resp) {
            res.json({
                token: generateToken(resp),
                ...resp
            })
        }).catch(function (err) {
            console.log(err)
            if (err.errors) {
                return res.status(406).json(validationMessage(err.errors));
            }
            return res.status(406).json(err);
        })
})

module.exports = authRouter;