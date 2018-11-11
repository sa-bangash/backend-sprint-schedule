
var Sequelize = require('sequelize');
var sequelize = require('./index');
var UserModal = require('./user.model');
var WorkSpace = sequelize.define('work-space', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'name is required'
            }
        }
    },
});
WorkSpace.belongsTo(UserModal);
// exprots
WorkSpace.sync();
module.exports = WorkSpace;
