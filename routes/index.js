var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var cache = require('../cache/mini.js');
var ipManage = require('../utils/ip_manage.js');
var cookie = require('../utils/cookie.js');
var ua = require('../utils/user_agent.js');
var Admin = require('../models/admin.js');

cache.new();
/* GET home page. */
router.get('/', [ua.mobile], function(req, res) {
  res.render('index');
});

router.get('/master', [cookie.get], function(req, res) {
  res.render('index_master');
});

router.get('/test', function(req, res, next) {
  res.sendfile('public/calender.html')
});

router.get('/post', function(req, res, next) {

  Post.create({title: "23333333333333333333333"});
  res.render('index', { title: 'post' });
});

router.get('/test-redirect', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'https://www.baidu.com')
  res.redirect(301, 'https://www.baidu.com');
});

router.post('/master/login', function(req, res, next) {
  var password = req.body.password;

  Admin.findByPassword(password).then(function(admin) {
    if (admin == null) {
      req._admin = {
        password: Symbol(),
      }
      next();
    } else {
      req._admin = admin;
      next();
    }
  })
}, function(req, res) {
  var admin = req._admin;
  var password = req.body.password;
  console.log(password, admin.password);
  if (admin.password == password) {
    var options = {
      maxAge: 1000 * 60 * 60, // would expire after 24 hours
      httpOnly: true, // The cookie only accessible by the web server
      signed: true // Indicates if the cookie should be signed
    }
    res.cookie('user', 'master', options)
    res.json({data: 'success'})
  } else {
    res.json({data: 'error'})
  }
});

router.get('/master/login', function(req, res) {
  res.render('login');
});

router.get('/subscribe', function(req, res) {
  res.render('login');
});

router.get('/master/reset', [cookie.get], function(req, res, next) {
  var password = req.query._password;
  Admin.findByPassword(password).then(function(admin) {
    req._admin = admin;
    next();
  })
}, function(req, res) {
  var admin = req._admin;
  var password = req.query.password;
  if (admin.password == null) {
    res.json({data: 'no'})
  } else {
    admin.resetPassworld(password);
    res.json({data: 'yes'})
  }
});




module.exports = router;
