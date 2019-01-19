
module.exports = function (sequelize, Sequelize) {
    var UserRole = sequelize.define('role', {
        name: {
            type: Sequelize.STRING,
        }
    })
    UserRole.sync({ force: true }).then(() => {
        UserRole.bulkCreate([
            {
                name: 'Admin'
            },
            {
                name: 'Backend-dev'
            },
            {
                name: 'Frondend-dev'
            },
            {
                name: 'Frontend-designer'
            },
            {
                name: 'UX-UI'
            },
            {
                name: 'Product-ower'
            },
            {
                name: 'Project-Manger'
            },
            {
                name: 'QA'
            }
        ])
    })
    UserRole.alreadySync = true;
    return UserRole;
}