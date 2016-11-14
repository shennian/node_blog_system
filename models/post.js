var Sequelize = require('sequelize');
var uuid = require('uuid');
var db = require('../db.js');
var Comment = require('./comment.js');

var path = require('path');
var basePath = path.resolve('.');

var fs = require('fs');

var toLocalTime = function() {
  var d = new Date();
  console.log(d, 'dddddddddddddd');
  var offset = new Date().getTimezoneOffset();
  console.log(offset, 'offfffffffffff');
  var n = new Date(d.getTime() + offset);
  console.log(n, 'nnnnnnnn');
  return n;
};

var Post = db.define('post', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: function() {return uuid.v1();},
  },
  title: {
    type: Sequelize.TEXT,
    defaultValue: '暂时还没有'
  },
  created_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  private: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  published: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  views: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  local_path: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: function() {
      return path.join(basePath, 'post', uuid.v1())
    }
  }
}, {
  freezeTableName: true, // Model tableName will be the same as the model name
  instanceMethods: {
    incViews: function() {
      this.views += 1;
      this.save();
    },
    incLikes: function() {
      this.likes += 1;
      this.save();
    },
    updateTitle: function(title) {
      // console.log(new Date().getTimezoneOffset(), '23fdfdsfd');
      this.updated_time = toLocalTime();
      console.log();
      this.title = title;
      this.save();
    },
    updatePost: function(post) {
      var path = this.local_path;
      fs.writeFile(path, post);
    },
    readPost: function() {
      var path = this.local_path;
      var promise = new Promise(function(success, error) {
        fs.readFile(path, function(err, data) {
          if (err) {
            error(err);
          } else {
            success(data);
          }
        });
      });
      return promise
    },
    publish: function() {
      this.published = true;
      this.save();
    },
    bePrivate: function() {
      this.private = true;
      this.save();
    },
    bePublic: function() {
      this.private = false;
      this.save();
    },
    basicInfo: function() {
      return {
        id: this.id,
        title: this.title,
        updated_time: this.updated_time,
        likes: this.likes,
        views: this.views,
      }
    },
  },
  classMethods: {
    findById: function(id) {
      return Post.find({
        where: {
          id: id
        }
      });
    },
    findAllPublishedBlog: function() {
      return Post.findAll({
        where: {
          private: false,
          published: true,
        }
      });
    },
    findAllPrivateBlog: function() {
      return Post.findAll({
        where: {
          private: true,
          published: true,
        }
      });
    },
    findAllBlog: function() {
      return Post.findAll();
    },
  }
});


Post.hasMany(Comment, {
  foreignKey:'post_id',
  targetKey:'id',
  constraints: false,
  as: 'Comments'
});

// console.log(Post);
// Post.prototype.constructor = function() {
//   console.log(this.id);
//   return Post;
// }
// console.log(12333);
// var a = new Post();
// console.log(a);
// console.log(Post);
// Post.create({title: 'hahaha'});

module.exports = Post;
