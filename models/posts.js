var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
  title: {type: String, required: true},
  link: String,
  content: {type: String, required: true},
  tags: Array,
  posted_at: String
});

// 定义方法
postsSchema.methods.createPost = function () {
  
}

var Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;

