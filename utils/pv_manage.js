var pvCache = require('../cache/pv.js');
var pvData = require('../models/pv.js');
var schedule = require('node-schedule');
// var sendEmail = require('sendEmail.js');

pvCache.new('pv', 0);

var pvManage = function(req, res, next) {
  var n = pvCache.get('pv');
  // 线程安全，先不管
  pvCache.set('pv', n + 1);
  next();
};

var pvSchedule = function() {
  // 定时任务，每天 4 点把 cache 的数据写入数据库 ...
  var rule = new schedule.RecurrenceRule();
  // rule.hour = new schedule.Range(0, 23, 1);
  rule.minute = 0

  schedule.scheduleJob(rule, function() {
    var n = pvCache.get('pv');
    pvData.create({
      count: n
    }).then(function() {
      pvCache.set('pv', 0);
    }).catch(function () {
      console.log("写入pv失败");
    });
  });
};

var pvCurrent = function() {
  return pvCache.get('pv');
}

module.exports = {
  pvManage: pvManage,
  pvSchedule: pvSchedule,
  pvCurrent: pvCurrent,
};
