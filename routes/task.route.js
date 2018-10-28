var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var TaskModel = require('../models/task.model');
var Sprint = require('../models/sprint.model').SprintModel;
var validationMessage = require('../gernal/helper').validationMessage;
var decoredToken = require('../config/auth.helper').decoredToken;
/* GET Task listing. */

router.post('/', function (req, res, next) {
    var newTask = new TaskModel({ ...req.body, user: req.user })
    newTask.save((error, resp) => {
        if (error) {
            res.status(406).send(validationMessage(error.errors));
            return;
        }
        res.send(resp.toClient());
    })
});

router.get('/all', function (req, res, next) {
    TaskModel.find().populate('sprintId').then(function (task) {
        res.json(task);
    }).catch(function (err) {
        res.status(500).send(err)
    })
})

router.post('/sprint', function (req, res, next) {
    var newSprint = new Sprint(req.body);
    newSprint.save().then((resp) => {
        res.json(resp);
    }).catch((err) => res.status(406).json(validationMessage(err.errors)))
})

router.get('/sprint', function (req, res, next) {
    Sprint.find().then((resp) => {
        res.json(resp)
    })
})

router.get('/:id', function (req, res, next) {
    TaskModel.findById(req.params.id).then((resp) => {
        res.send(resp.toClient());
    })
})

router.delete('/:id', function (req, res, next) {
    TaskModel.findOneAndDelete(req.params.id).then((resp) => {
        res.send(resp.toClient());
    })
})

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

module.exports = router;