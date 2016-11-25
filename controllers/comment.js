let commentModel = require('../models/comment');

exports.addComment = (req, res) => {
  console.log(req.body);
  console.log(req.params.post_id);
  console.log(req.session.user);
  if (req.body.comment && req.body.comment.trim() && req.session.user._id && req.params.post_id) {
    commentModel.addComment(req.body.comment, req.session.user._id, req.params.post_id);
  } else {
    console.log('参数不全');
  }
};