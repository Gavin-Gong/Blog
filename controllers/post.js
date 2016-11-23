let postModel = require('../models/post');
// GET -> post/all
exports.showAllPost = (req, res, next) => {
  postModel.getPosts()
    .then(data => {
      res.render('posts', {posts: data});
    });
};

// signin && checkAdmin
// GET -> post/create
exports.showWriteMode = (req, res, next) => {
  res.render('edit');
};

// signin && checkAdmin
// POST -> post/create
exports.createPost = (req, res, next) => {
  // TODO 表单验证
  postModel.createPost(req.body)
    .then(post => {
      req.flash('success', '发表成功');
      res.redirect(`/post/${post._id}`);
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect(req.get('referer'));
    });
};

// GET -> post/:post_id/detail
exports.showSinglePost = (req, res, next) => {
  postModel.getPostById(req.params.post_id)
    .then(data => {
      res.render('post', {post: data});
  });
};

// GET -> post/:post_id/edit
exports.showEditMode = (req, res, next) => {
  postModel.getPostById(req.params.id)
    .then(post => {
      console.log(post);
      if (post) {
        res.render('edit', {post: post});
      } else {
        throw new Error('没有找到该文章');
      }
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('./');
    });
};

// POST -> checkSignin && checkAdmin
exports.delPost = (req, res, next) => {
  postModel.delPostById(req.params.id)
    .then(found => {
      req.flash('success', '删除成功');
      res.redirect('/post/all');
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('back');
    });
};
