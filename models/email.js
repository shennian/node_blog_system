var db = require('../db.js');
var Sequelize = require('sequelize');



var Email = db.define('email', {
  address: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
}, {
  freezeTableName: true,
  instanceMethods: {},
  classMethods: {},
});