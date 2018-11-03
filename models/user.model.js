var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: {
        type: String, required: [true, 'Email is required'],
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                this.model('User').findOne({ email: v }, function (err, doc) {
                    console.log(doc);
                    if (err || doc) {
                        cb(false)
                    } else {
                        cb(true);
                    }

                })
            },
            message: 'Email Already Exsit'
        }
    },
    password: { type: String, required: [true, 'Password is required'] },
    workSpace: {
        type: String,
        validate: {
            isAsync: true,
            validator: function (v, cb) {
                this.model('User').findOne({ workSpace: v }, function (err, doc) {
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
    }
})

UserSchema.method('toClient', function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
})
exports.UserSchema = UserSchema;

exports.UserModel = mongoose.model('User', UserSchema);