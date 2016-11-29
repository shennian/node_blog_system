var db = require('../db.js');
var Sequelize = require('sequelize');
var uuid = require('uuid');

var formatDate = function(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

var UV = db.define('uv', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: function() {return uuid.v1();},
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
}, {
  freezeTableName: true,
  instanceMethods: {
  },
  classMethods: {
    between: function(start, end) {
      return UV.findAll({
        where: {
          createdAt: {
            gte: formatDate(start),
            lte: formatDate(end),
          },
        }
      });
    },
    lastDay: function() {
      var now = new Date()
      var last = new Date(new Date().setDate(now.getDate() - 1))
      return UV.between(last, now)
    },
    lastOfDay: function(n) {
      var now = new Date()
      var last = new Date(new Date().setDate(now.getDate() - n))
      return UV.between(last, now)
    },
  },
});

module.exports = UV;
