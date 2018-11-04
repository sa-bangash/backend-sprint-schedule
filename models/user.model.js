var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const USER_ROLE = Object.freeze({
    Admin: 'Admin',
    Dispacher: 'Dispacher',
    BackendDev: 'BackendDev',
    FrondendDev: 'FrontendDev',
    FrondendDesigner: 'FrontendDesigner',
    UxUi: 'UxUi',
    FullStackDev: 'FullStackDev',
    QA: 'QA',
})

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
})

UserSchema.virtual('workspace', {
    ref: 'workspace',
    localField: '_id',
    foreignField: 'users.id'

})

UserSchema.method('toClient', function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
})

// exprots
exports.UserSchema = UserSchema;
exports.USER_ROLE = USER_ROLE;
exports.UserModel = mongoose.model('User', UserSchema);