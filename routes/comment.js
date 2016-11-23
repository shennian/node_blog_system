var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');
var iconv = require('iconv-lite');


router.post('/create', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  Comment.create({
    name: name,
    email: email,
    message: message
  }).then(function(comment) {
    req._comment = comment;
    next();
  });
}, function(req, res, next) {
  // var post = req._comment;
  var post_id = req.body.post_id;
  Post.findById(post_id).then(function(post) {
    req._post = post;
    next();
  });
}, function(req, res, next) {
  var post = req._post;
  var comment = req._comment;
  console.log(post);
  post.addComment(comment).then(function() {
    res.json({data: "ok"});
  }, function(err) {
    res.json({data: err});
  });
});

router.get('/all', function(req, res, next) {
  var id = req.query.id;
  Post.findById(id).then(function(post) {
    req._post = post;
    next();
  });
}, function(req, res) {
  var post = req._post;
  post.getComments({limit: 6, order: '"created_time" DESC', where: {private: false}}).then(function(comments) {
    res.json({data: comments});
  }, function(err) {
    res.json({data: err});
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  Comment.findById(id).then(function(comment) {
    if (comment == null) {
      req._existed = false;
      next();
    } else {
      req._existed = true;
      req._comment = comment;
      next();
    }
  });
}, function(req, res) {
  if (req._existed == true) {
    var comment = req._comment;
    comment.delete();
    res.json({data: '删除评论成功'});
  } else {
    res.json({data: '评论不存在'});
  }
});

router.get('/all/master', function(req, res) {
  var post_id = req.query.post_id;
  var start = req.query.start;
  var end = req.query.end;
  var offest = req.query.offset || 0;
  var limit = req.query.limit || 15;
  var spec = {
    offest: offest,
    limit: limit,
    where: {},
  }
  if (post_id != undefined) {
    spec.where.post_id = post_id;
  }
  if (start != undefined) {
    spec.where.createdAt = {
      gte: start,
    };
  }
  if (end != undefined) {
    spec.where.createdAt = {
      lte: end,
    };
  }
  console.log(spec);
  Comment.findAll(spec).then(function (comments) {
    res.json({data: comments});
  });
});
module.exports = router;
