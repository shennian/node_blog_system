var Post = require('./post.js');
var Comment = require('./comment.js');
var Email = require('./email.js');
var Admin = require('./admin.js');
var PV = require('./pv.js');
var UV = require('./uv.js');


Post.sync({force: false});
Comment.sync({force: false});
Email.sync({force: false});
Admin.sync({force: false});
PV.sync({force: false});
UV.sync({force: false});
