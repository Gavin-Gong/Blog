let postModel = require('../models/post');

// TODO /admin -> 子域名

exports.index = (req, res, next) => {
  postModel.getPosts()
    .then(posts => {
      let enabledPosts = posts.filter(item => item.status === 1);
      let disabledPosts = posts.filter(item => item.status === 0);
      let drafts = posts.filter(item => item.status === -1);

      res.render('admin', {enabledPosts, disabledPosts, drafts});
    });
};
