let commentModel = require('../models/comment');

exports.addComment = (req, res) => {
  commentModel.addComment(req.body.comment, req.session.user._id, req.params.post_id)
    .then(data => {
      req.flash('success', '评论成功');
      res.redirect('/');
    })
    .catch(err => {

    });
};

exports.delComment = (req, res) => {
  commentModel.delComment(req.params.comment_id)
    .then(data => {
      req.flash('success', '删除成功');
      res.redirect('/u/');
    })
    .catch(err => {
      console.log(err.message);
    });
};
