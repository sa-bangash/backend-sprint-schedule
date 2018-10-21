var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
})
var taskSchema = new Schema({
    user: UserSchema,
    storyNumber: { type: String },
    description: { type: String, required: [true, 'Description is required'] },
    estimatedTime: { type: String, required: [true, 'Estimated Time is required'] },
    date: { type: String, required: [true, 'Date is Required'] },
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