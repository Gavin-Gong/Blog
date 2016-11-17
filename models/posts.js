var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
  title: {type: String, required: true},
  link: String,
  content: {type: String, required: true},
  tags: Array,
  posted_at: String,
  updated_at: String
});

// 定义方法
postsSchema.method('');
postsSchema.pre('save', function(next) {
  // TODO fixme 用户实际时间? 判断用户所在时区
  // TODO 标签功能?
  let nowTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  if(!this.posted_at) this.posted_at = nowTime;
  this.updated_at = nowTime;
  next();
});

var Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;

