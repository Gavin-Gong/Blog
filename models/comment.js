var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String,
  username: String,
  avatar: String,
  is_read: Boolean,
  posts: String,
});
commentSchema.method('fetchComment', function () {
  console.log(this);
});
var commentModel = mongoose.model('Comment', commentSchema);