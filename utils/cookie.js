var setCookie = function(req, res, next) {
  var options = {
    maxAge: 1000 * 60, // would expire after 24 hours
    httpOnly: true, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed
  }
  res.cookie('user', 'master', options)
  next()
};

var getCookie = function(req, res, next) {
  var cookie = req.signedCookies.user;
  if (cookie != 'master') {
    res.json({data: 'miss cookie'})
  } else {
    next();
  }
};

module.exports = {
  get: getCookie,
  set: setCookie,
}