var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var cache = require('../cache/mini.js');
var ipManage = require('../utils/ip_manage.js')

cache.new();
/* GET home page. */
router.get('/', function(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log(ip);
  console.log(req.header('x-forwarded-for'));
  console.log(req.connection.remoteAddress);
  console.log(req.connection._remoteAddress);
  cache.set('1', '2');
  res.render('index', {num: 60, sec: 2});
  //res.json({data: 'ues'});
});

router.get('/test', [ipManage.apiLimit], function(req, res, next) {
  cache.set('4', '2');
  console.log(cache.get('1'));
  //res.render('index', { title: 'post' });
  res.json({data: 'ues'});
});

router.get('/post', function(req, res, next) {

  Post.create({title: "23333333333333333333333"});
  res.render('index', { title: 'post' });
});

router.get('/test-redirect', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', 'https://www.baidu.com')
  res.redirect(301, 'https://www.baidu.com');
});




module.exports = router;
