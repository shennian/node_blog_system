// var Sequelize = require('sequelize');
// "fontsize" ,
// "orderlist" ,
// "unorderlist" ,
// "alignleft" ,
// "aligncenter" ,
// "alignright" ,
// "link" ,
// "text" ,
// "submit" ,
// "cancel" ,
// "unlink" ,
// "table" ,
// "emotion" ,
// "img" ,
// "video" ,
// "width",
// "height",
// "location" ,
// "loading" ,
// "searchlocation" ,
// "dynamicMap" ,
// "clearLocation",
// "langDynamicOneLocation" ,
// "insertcode" ,
// "undo" ,
// "redo" ,
// "fullscreen" ,
// "openLink"



Object.prototype.limit = function(n) {
  Object.assign(this, {limit: n});
  return this;
}
Object.prototype.offset = function(n) {
  Object.assign(this, {offset: n})
  return this;
}
Object.prototype.desc = function(name) {
  Object.assign(this, {order: name + ' DESC'})
  return this;
}
Object.prototype.asc = function(name) {
  Object.assign(this, {order: name + ' asc'})
  return this;
}

spec = {post_id: 1}
//Post.findCommets(spec.offset(2).limit(10).desc('created_time')).then();
a = {where: {id: 1}}
// a.limit(1)
// console.log(a);
// a.offset(1)
// console.log(a);
// a.asc(1)
// console.log(a);
// a.desc(1)
// console.log(a);
console.log(a.limit(1).offset(3))


//var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
//
//// create reusable transporter object using the default SMTP transport
//var transporter = nodemailer.createTransport(
//    smtpTransport({
//      host: 'smtp-mail.outlook.com',
//      port: 25,
//      auth: {
//        user: 'ashen19@hotmail.com',
//        pass: 'hotmail112233'
//      }
//}));
//
//// setup e-mail data with unicode symbols
//var mailOptions = {
//  from: '"Fred Foo 👥" <ashen19@hotmail.com>', // sender address
//  to: '836281742@qq.com', // list of receivers
//  subject: 'Hello ✔', // Subject line
//  text: 'Hello world 🐴', // plaintext body
//  html: '<b>Hello world 🐴</b>' // html body
//};
//
//// send mail with defined transport object
//transporter.sendMail(mailOptions, function(error, info){
//  if(error){
//    return console.log(error);
//  }
//  console.log('Message sent: ' + info.response);
//});

var jade = require('jade');

var html = jade.renderFile('email.jade');
console.log(html)































