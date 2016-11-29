var uvCache = require('../cache/uv.js');
var uvData = require('../models/uv.js');
var schedule = require('node-schedule');


uvCache.new('uv', 0);

var uvManage = function(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  if (uvCache.get(ip) == undefined) {
    uvCache.set(ip, true);
    var n = uvCache.get('uv');
    uvCache.set('uv', n + 1);
  }
  next();
};

var uvSchedule = function() {
  // 定时任务，每天 4 点把 cache 的数据写入数据库 ...
  var rule = new schedule.RecurrenceRule();
  // rule.hour = new schedule.Range(0, 23, 1);
  rule.minute = new schedule.Range(0, 59, 1);

  schedule.scheduleJob(rule, function() {
    var n = uvCache.get('uv');
    uvData.create({
      count: n
    }).then(function() {
      uvCache.set('uv', 0);
    }).catch(function () {
      console.log("写入uv失败");
    });
  });
};

var uvCurrent = function() {
  return uvCache.get('uv');
}

module.exports = {
  uvManage: uvManage,
  uvSchedule: uvSchedule,
  uvCurrent: uvCurrent,
};

module.exports = {
  uvManage: uvManage,
  uvSchedule: uvSchedule,
  uvCurrent: uvCurrent,
};
