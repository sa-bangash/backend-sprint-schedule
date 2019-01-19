// mysql connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('schedule', 'root', null, {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3307,
});
const db = {};
db.Role = require('./user-role.model')(sequelize, Sequelize);
db.User = require('./user.model')(sequelize, Sequelize);
db.Workspace = require('./workspace.model')(sequelize, Sequelize);
db.UserWorkspace = require('./user-workspace.model')(sequelize,Sequelize);




//table associate
Object.keys(db).forEach((key) => {
  if (db[key].associate) {
    db[key].associate(db);
  }
})

//table ass
Object.keys(db).forEach((key) => {
  if (!db[key].alreadySync) {
    db[key].sync();
  }
})
db.sequelize = sequelize;
module.exports = db;