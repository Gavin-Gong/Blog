let commentModel = require('../models/comment');

exports.addComment = (req, res) => {
  // console.log(req.body);
  // console.log(req.params.post_id);
  // console.log(req.session.user);
  if (req.body.comment && req.body.comment.trim() && req.session.user._id && req.params.post_id) {
    commentModel.addComment(req.body.comment, req.session.user._id, req.params.post_id)
      .then(data => {
        // res.redirect('./');
        res.redirect(req.get('referer'));
      })
      .catch(err => {

      });
  } else {
    console.log('参数不全');
  }
};

exports.delComment = (req, res) => {
  // TODO 删除权限
  commentModel.delComment(req.params.comment_id)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err.message);
    });
};
