var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    storyNumber: { type: String, required: true },
    description: String,
    estimatedTime: { type: Number, required: true },
    status: Boolean,
})

taskSchema.method('toClient', function () {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
})
var taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;