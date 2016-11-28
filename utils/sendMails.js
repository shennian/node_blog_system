var jade = require('jade');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var Eamil = require('../models/email.js');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(
    smtpTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      auth: {
        user: 'ashen19@hotmail.com',
        pass: 'hotmail112233'
      }
}));


module.exports = function(address, info) {
  var html = jade.renderFile('email.jade', info);
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'ashen19@hotmail.com', // sender address
    to: address, // list of receivers
    subject: 'hlooo ✔', // Subject line
    text: '新博客', // plaintext body
    html: html // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error) {
      Eamil.findByAddress(address).then(function(email) {
        email.unsend();
      });
    } else {
      Eamil.findByAddress(address).then(function(email) {
        email.send();
      });
    }

  });
}
//console.log(html)
