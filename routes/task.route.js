var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var TaskModel = require('../models/task.model');

var validationMessage = require('../gernal/helper').validationMessage;
var decoredToken = require('../config/auth.helper').decoredToken;
/* GET Task listing. */
router.get('/:id', function (req, res, next) {
    TaskModel.findById(req.params.id).then((resp) => {
        res.send(resp.toClient());
    })
})
router.post('/', function (req, res, next) {
    var newTask = new TaskModel({ ...req.body, user: req.user })
    console.log(decoredToken(req));
    newTask.save((error, resp) => {
        if (error) {
            res.status(406).send(validationMessage(error.errors));
            return;
        }
        res.send(resp.toClient());
    })
});

router.get('/', function (req, res, next) {
    TaskModel.find({ 'user._id': req.user._id }).then(function (resp) {
        res.json(resp)
    }).catch(function (errors) {
        res.error(errors);
    })
})

router.delete('/:id', function (req, res, next) {
    TaskModel.deleteOne({ _id: req.params.id }, function (errors, task) {
        res.send(task);
    })
})

router.delete('/all', function (req, res, next) {
    TaskModel.find({}).then(function (errors, task) {
        res.json(task);
    }).catch((err) => {
        res.error(err)
    })
})

module.exports = router;