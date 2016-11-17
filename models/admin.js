var db = require('../db.js');
var Sequelize = require('sequelize');



var Admin = db.define('admin', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: '123',
  }
}, {
  freezeTableName: true,
  instanceMethods: {
    resetPassworld: function(password) {
      this.password = password;
      this.save();
    }
  },
  classMethods: {
    findByPassword: function(password) {
      return Admin.find({
        where: {
          password: password
        }
      });
    },
  },
});

module.exports = Admin;
