var Sequelize = require('sequelize');
var path = require('path');

var basePath = path.resolve('.');
var sqlitePath = path.join(basePath, 'sqlite.db');
var db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: sqlitePath
});

var initSqlite = function() {

}

// var initMysql

module.exports = db;
