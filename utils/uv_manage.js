var uvCache = require('../cache/uv.js');


uvCache.new();

var uvManage = function(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  if (uvCache.get(ip) == undefined) {
    uvCache.set(ip, true);
  }
  next();
};

module.exports = uvManage
