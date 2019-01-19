

module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define('user', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'name is required'
                }
            }
        },
        email: {
            allowNull: false,
            unique: { args: true, msg: 'Email already in user' },
            type: Sequelize.STRING,
            validate: {
                isEmail: { args: true, msg: 'Invalid email' },
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password is required'
                }
            }
        },
    });

    User.prototype.toClient = function () {
        return {
            name:this.name,
            email:this.email,
        }
    }
    return User;
}



