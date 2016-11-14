var Post = require('./post.js');
var Comment = require('./comment.js');
var Email = require('./email.js');


Post.sync({force: true});
Comment.sync({force: true});
Email.sync({force: true});
