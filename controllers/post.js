let postModel = require('../models/post');
const fs = require('fs');
// GET -> post/all
exports.showAllPost = (req, res, next) => {
  postModel.getPosts()
    .then(data => {
      // console.log(data);
      res.render('posts', {posts: data});
    })
    .catch(err => {
      console.log(err.message);
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
      res.redirect(`/post/${post._id}/detail`);
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
      console.log(data);
      res.render('post', {post: data});
  })
    .catch(err => {
      console.log(err.message);
    });
};

// GET -> post/:post_id/edit
exports.showEditMode = (req, res, next) => {
  postModel.getRawPostById(req.params.post_id)
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
      res.redirect(req.get('referer'));
    });
};

// POST -> checkSignin && checkAdmin
exports.delPost = (req, res, next) => {
  postModel.delPostById(req.params.post_id)
    .then(found => {
      req.flash('success', '删除成功');
      res.redirect('/u/admin');
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('back');
    });
};

exports.dlSinglePost = (req, res) => {
  postModel.getRawPostById(req.params.post_id)
    .then(post => {
      // create MD file
      fs.writeFile(`./public/tmp/${post.title}.md`, post.content, (err) => {
        if (err) throw err;
        res.download(`./public/tmp/${post.title}.md`, err => {
          fs.unlink(`./public/tmp/${post.title}.md`, err => {
            console.log(err);
          })
        });
      });
    });
};
