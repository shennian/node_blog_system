var _setCookie = function(res) {
  var options = {
    maxAge: 1000 * 60 * 60, // would expire after 24 hours
    httpOnly: true, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed
  }
  res.cookie('user', 'master-sen-1219', options)
}

var setCookie = function(req, res, next) {
  _setCookie(res)
  next()
};

var getCookie = function(req, res, next) {
  var cookie = req.signedCookies.user;
  if (cookie != 'master-sen-1219') {
    res.json({data: 'miss cookie'})
  } else {
    _setCookie(res)
    next();
  }
};

module.exports = {
  get: getCookie,
  set: setCookie,
}
