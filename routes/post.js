var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');
var iconv = require('iconv-lite');


router.get('/create', function(req, res, next) {
  Post.create().then(function(post) {
    req._post = post;
    next();
  });
}, function(req, res, nex) {
  var post = req._post;
  console.log(post);
  res.render('edit', { postId: post.id });
});


router.post('/edit', function(req, res, next) {
  var id = req.body.id;
  var title = req.body.title;
  var html = req.body.post;
  Post.findById(id).then(function(post) {
    post.updateTitle(title);
    post.updatePost(html);
    res.json(post.basicInfo());
  });
});


router.post('/:id/publish', function(req, res, next) {
  // 数据处理
  var id = req.params.id;
  Post.findById(id).then(function(post) {
    if (post == null) {
      req._published = false;
      next();
    } else {
      req._published = true;
      post.publish();
      next();
    }
  });
}, function(req, res, next) {
  // 根据数据处理的结果，返回相应的结果
  if (req._published == true) {
    /* 可以清真一点 */
    res.redirect('/post/' + id);
  } else {
    res.json({data: '好像遇到了一些问题！~'})
  }
});


router.get('/:id/get', function(req, res, next) {
  // 这里是如果数据没有找到，直接返回，第二个函数会短一些。
  var id = req.params.id;
  Post.findById(id).then(function(post) {
    if (post == null) {
      req._existed = false;
      next();
    } else {
      req._existed = true;
      req._post = post;
      next();
    }
  });
}, function(req, res, next) {
  if (req._existed == true) {
    var post = req._post;
    res.render('post',{info: post.basicInfo()});
  } else {
    res.json({data: '博客消失了！~'});
  }
});


router.get('/:id/post-content/get', function(req, res, next) {
  var id = req.params.id;
  Post.findById(id).then(function(post) {
    post.incViews()
    return post.readPost();
  }).then(function(data) {
    var decoded_data = iconv.decode(data, 'utf-8');
    res.json({data: decoded_data});
  }, function() {
    res.json({data: '获取失败'})
  });
});


router.get('/all/master', function(req, res, next) {
  Post.findAllBlog().then(function(posts) {
    res.json({data: posts});
  });
});


router.get('/private-all/master', function(req, res, next) {
  Post.findAllPrivateBlog().then(function(posts) {
    res.json({data: posts});
  });
});


router.get('/all', function(req, res, next) {
  Post.findAllPublishedBlog().then(function(posts) {
    res.json({data: posts});
  });
});


router.post('/private/true', function(req, res, next) {
  var id = req.query.id;
  Post.findById(id).then(function (post) {
    if (post == null) {
      req._existed = false;
} else {
  req._existed = true;
  req._post = post;
}
next();
});
}, function(req, res, next) {
  if (req._existed == true) {
    var post = req._post;
    post.bePrivate();
    res.json({data: "博客设为私有"});
  } else {
    res.json({data: "博客获取失败"});
  }
});


router.post('/private/false', function(req, res, next) {
  var id = req.query.id;
  Post.findById(id).then(function (post) {
    if (post == null) {
      req._existed = false;
    } else {
      req._existed = true;
      req._post = post;
    }
    next();
  });
}, function(req, res, next) {
  if (req._existed == true) {
    var post = req._post;
    post.bePublic();
    res.json({data: "博客取消私有"});
  } else {
    res.json({data: "博客获取失败"});
  }
});


router.post('/likes', function(req, res, next) {
  var id = req.query.id;
  Post.findById(id).then(function (post) {
    if (post == null) {
      req._existed = false;
    } else {
      req._existed = true;
      req._post = post;
    }
    next();
  });
}, function(req, res, next) {
  if (req._existed == true) {
    var post = req._post;
    post.incLikes();
    res.json({data: "博客点赞成功"});
  } else {
    res.json({data: "博客获取失败"});
  }
});


router.get('/test', function(req, res, next) {
  res.redirect('/')
});



module.exports = router;
