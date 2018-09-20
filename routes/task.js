var express = require('express');
var router = express.Router();

var TaskModel = require('../models/task.model');
/* GET Task listing. */
router.get('/:id', function (req, res, next) {
    TaskModel.findById(req.params.id).then((resp) => {
        res.send(resp.toClient());
    })
})
router.post('/', function (req, res, next) {
    console.log(req.body)
    var newTask = new TaskModel(req.body)

    newTask.save((error, resp) => {
        if (error) {
            console.log(error)
        }
        res.send(resp.toClient());
    })
});

router.get('/', function (req, res, next) {
    TaskModel.find({}).then(function (resp) {
        res.send(resp)
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
