var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SprintSchema = new Schema({
    name: { type: String, required: [true, 'Sprint name is required'] },
    start: { type: Number, required: [true, 'Start Date is required'] },
    end: { type: Number, required: [true, 'End Date is required'] }
})

module.exports = { SprintModel: mongoose.model('sprint', SprintSchema), SprintSchema: SprintSchema }