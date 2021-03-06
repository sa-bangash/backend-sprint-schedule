var mongoose = require('mongoose');
var Sprint = require('./sprint.model').SprintModel;
var moment = require('moment');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
})
var StatusSchema = new Schema({
    id: { type: Number, required: true },
    display: { type: String, required: true }
})
var taskSchema = new Schema({
    user: UserSchema,
    storyNumber: { type: String },
    description: { type: String, required: [true, 'Description is required'] },
    estimatedTime: { type: String, required: [true, 'Estimated Time is required'] },
    date: {
        type: Number,
        required: [true, 'Date is Required'],
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                Sprint.findById(this.sprintId)
                    .then((value) => {
                        const start = moment(value.start);
                        const end = moment(value.end);
                        const date = moment(v);
                        if (date.isBetween(start, end, 'd', '[]')) {
                            cb(true);
                        } else {
                            cb(false);
                        }
                    }).catch(function (err) {
                        cb(false);
                    })

            },
            message: 'Date should be exsit within Sprint date',
        }
    },
    // 1:for todo, 2:for in progress, 3:for done
    status: { type: StatusSchema, required: [true, 'Status Is Required'], default: { id: 1, display: 'To Do' } },
    sprintId: {
        type: Schema.Types.ObjectId, ref: 'sprint',
        required: [true, 'Sprint id is required'],
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                Sprint.findOne({ _id: v }, function (err, doc) {
                    if (err || !doc) {
                        cb(false)
                    } else if (doc.end < new Date().getTime()) {
                        cb(false, 'Not allowed to add in past sprint');
                    } else {
                        cb(true)
                    }
                })
            },
            message: 'Sprint id not Exsit'
        }
    },
})

taskSchema.method('toClient', function () {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
})
var taskModel = mongoose.model('task', taskSchema);


module.exports = taskModel;