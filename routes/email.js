var express = require('express');
var router = express.Router();
var Eamil = require('../models/email.js');
var sendEamil = require('../utils/sendMails.js');
var cookie = require('../utils/cookie.js');

router.post('/create', function(req, res, next) {
  var address = req.body.address;
  //var username = req.body.username;
  Eamil.findByAddress(address).then(function(email) {
    if (email == null) {
      req._existed = false;
      next();
    } else {
      req._existed = true;
      req._email = email;
      next();
    }
  });
}, function(req, res) {
  if (req._existed == true) {
    var username = req.body.username;
    var email = req._email;
    email.updateUsername(username);
    res.json({data: '更新成功'})
  } else {
    var address = req.body.address;
    var username = req.body.username;
    Eamil.create({
      address: address,
      username: username,
    }).then(function(email) {
      res.json({data: '创建成功'})
    })
  }
});

router.get('/all/master', [cookie.get], function(req, res) {
  Eamil.findAll().then(function(emailList) {
    res.json({data: emailList});
  });
});

router.get('/unsent/all', [cookie.get], function(req, res) {
  Eamil.findAllSendError().then(function(emailList) {
    res.json({data: emailList});
  });
});

router.get('/delete/master', [cookie.get], function(req, res) {
  var address = req.query.address;
  Eamil.deleteByAddress(address).then(function() {
    res.json({data: '删除成功'});
  }).catch(function() {
    res.json({data: '122'});
  });
});

router.post('/send/all', [cookie.get], function(req, res) {
  var url = req.body.url;
  var title = req.body.title;
  Eamil.findAll().then(function(emails) {
    for (var i = 0; i < emails.length; i++) {
      var email = emails[i];
      email.unsend();
      var info = {
        url: url,
        title: title,
        del_url: '/email/delete?address=' + email.address,
      }
      sendEamil(email.address, info);
    }
  });
  res.json({data: '正在发送'})
});

router.post('/send', [cookie.get], function(req, res) {
  var address = req.body.address;
  var url = req.body.url;
  var title = req.body.title;
  Eamil.findByAddress(address).then(function(email) {
    email.unsend();
    var info = {
      url: url,
      title: title,
      del_url: '/email/delete?address=' + email.address,
    }
    sendEamil(email.address, info);
  });
  res.json({data: '正在发送'})
});

module.exports = router;
