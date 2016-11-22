var Post = require('./post.js');
var Comment = require('./comment.js');
var Email = require('./email.js');
var Admin = require('./admin.js');


Post.sync({force: true});
Comment.sync({force: true});
Email.sync({force: true});
Admin.sync({force: true});


// init admin
Admin.create({
  password: '123',
});
