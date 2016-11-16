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
  instanceMethods: {
    updateUsername: function(username) {
      this.username = username;
      this.save();
    },
    send: function() {
      this.status = true;
      this.save();
    },
    unsend: function(username) {
      this.status = false;
      this.save();
    },
  },
  classMethods: {
    findByAddress: function(address) {
      return Email.find({
        where: {
          address: address
        }
      });
    },
    deleteByAddress: function(address) {
      return Email.destroy({
          address: address,
      });
    },
    findAllSendError: function() {
      return Email.findAll({
        where: {
          status: false,
        }
      })
    },
    findAllSendSuccess: function() {
      return Email.findAll({
        status: true
      })
    }

  },
});

module.exports = Email;