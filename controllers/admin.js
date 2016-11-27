let postModel = require('../models/post');

// TODO /admin -> 子域名

exports.index = (req, res, next) => {
  postModel.getPosts()
    .then(posts => {
      res.render('admin', {posts,});
    });
};