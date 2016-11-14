var express = require('express');
var router = express.Router();
var Post = require('../models/post.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'post' });
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
