var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { timePlugin } = require('../lib/mongoPlugin');
var {updatePostById} = require('./post');

var commentSchema = new Schema({
  content: String,
  username: String,
  avatar: String,
  is_read: Boolean,
  // TODO 增加留言审核
  is_allow: {
    type: Boolean,
    default: false
  },
  posts: String,
  comment_from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  comment_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  }
});
commentSchema.method('fetchComment', function () {
  console.log(this);
});

commentSchema.plugin(timePlugin);
var commentModel = mongoose.model('comments', commentSchema);

// module.exports =commentModel;

exports.getCommentsByUserId = (user_id) => {
  return commentModel.find({comment_to: user_id}).populate('comment_from');
};
exports.getCommentsByPostId = (post_id) => {
  return commentModel.find({comment_from: post_id}).populate('comment_to');
};
exports.addComment = (content, user_id, post_id) => {
  return commentModel.create({
    content,
    comment_from: user_id,
    comment_to: post_id
  }).then(comment => {
    // 添加到 postModel
    console.log(comment);
    updatePostById(post_id, {$push: {comments: {_id: comment._id}}})
      // .catch(err => {
      //   if (err) console.log(err.message);
      // });
  });
};