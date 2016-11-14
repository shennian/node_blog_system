var jade = require('jade');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(
    smtpTransport({
      host: 'smtp-mail.outlook.com',
      port: 25,
      auth: {
        user: 'ashen19@hotmail.com',
        pass: 'hotmail112233'
      }
}));

var html = jade.renderFile('../email.jade', {url:"http://www.baidu.com", title: "233333"});
// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'ashen19@hotmail.com', // sender address
  to: '836281742@qq.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: '新博客', // plaintext body
  html: html // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
  if(error) {
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});
console.log(html)