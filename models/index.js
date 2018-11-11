// mysql connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('schedule', 'root', null, {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3307,
});




module.exports =sequelize;