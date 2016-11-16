var db = require('../db.js');
var Sequelize = require('sequelize');
var uuid = require('uuid');


var Comment = db.define('comment', {
  id: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
    defaultValue: function() {return uuid.v1()},
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  created_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  private: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  post_id: {
    type: Sequelize.STRING,
    allowNull: true,
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  instanceMethods: {
    delete: function() {
      this.private = true;
      this.save();
    }
  },
  classMethods: {
    findById: function(id) {
      return Comment.find({
        where: {
          id: id
        }
      });
    },
  },
});

module.exports = Comment;
