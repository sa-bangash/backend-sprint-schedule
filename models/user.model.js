var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

UserSchema.method('toClient', function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
})
exports.UserSchema = UserSchema;

exports.UserModel = mongoose.model('User', UserSchema);