
module.exports = function (sequelize, Sequelize) {
    var Workspace = sequelize.define('workspace', {
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
    Workspace.associate = function (models) {
        Workspace.belongsTo(models.User)
    }
    return Workspace;
}

