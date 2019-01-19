module.exports = function (sequelize, Sequelize) {
    const UserWorkspace = sequelize.define('user_workspace', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    })
    // UserWorkspace.associate = function (models) {
    //     models.Role.hasMany(UserWorkspace, { as: 'role' , foreignKey : 'roleid'})
    //     models.User.belongsToMany(models.Workspace, { through: { model: UserWorkspace, unique: false } })
    //     // models.Workspace.belongsToMany(models.User, { through: { model: UserWorkspace, unique: false } })


    // }
    return UserWorkspace;
}  
 
