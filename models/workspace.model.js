var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var USER_ROLES = require('./user.model').USER_ROLE;
var UserSchema = require('./user.model').UserSchema;
var RoleSchema = new Schema({
    id: { type: Schema.Types.ObjectId, require: true, ref: 'user' },
    role: [{
        type: String,
        enum: Object.values(USER_ROLES),
    }]
})
var WorkSpaceSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                this.model('workspace').findOne({ name: v }, function (err, doc) {
                    console.log(doc);
                    if (err || doc) {
                        cb(false)
                    } else {
                        cb(true);
                    }

                })
            },
            message: 'Work space Already Exsit'
        }
    },
    users: [{
        type: RoleSchema
    }]
})
module.exports = {
    WorkSpaceSchema,
    WorkSpaceModal: mongoose.model('workspace', WorkSpaceSchema)
}