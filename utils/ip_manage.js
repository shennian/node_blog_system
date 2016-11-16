var ipCache = require('../cache/ip.js');


ipCache.new();

var apiVisiteManage = function(req, res, next) {
  var limit = 1;
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log(ip, ipCache.get(ip));
  if (ipCache.get(ip) == undefined) {
    ipCache.set(ip, 0);
    next();
  } else {
    var n = ipCache.get(ip);
    if (n + 1 >= limit) {
      res.json({data: '请求过于频繁'})
    } else {
      ipCache.set(ip, n + 1);
      next();
    }
  }
};

setInterval(function () {
  ipCache.clear();
}, 1000 * 60);

module.exports = {
  apiLimit:　apiVisiteManage,
}