let router = require('express').Router();
var Posts = require('../models/posts');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var checkLogin = require('../middlewares/check').checkLogin;
var postModel = require('../models/posts');

router.get('/all', (req, res, next) => {
  // TODO redirect if '/post'
  Posts.find({}).then(data => {
    res.render('posts', {posts: data})
  });
  next();
});
// TODO fixme 当文章id为create???
router.get('/create',  (req, res) => {
  res.render('edit');
});

router.post('/create', checkLogin, (req, res) => {
  console.log(req.body);
  if (req.body.title.trim() && req.body.content.trim()) {
    postModel.find({title: req.body.title.trim()})
      .then(posts => {
        console.log(req.body.content);
        if (posts.length === 0) {
          let newPost = postModel({
            title: req.body.title.trim(),
            content: req.body.content.trim(),
          });
          return newPost.save();
        } else {
          throw new Error('已经存在同名文章')
        }
      })
      .then (post => {
        req.flash('success', '发表成功');
        res.redirect(`/posts/${post._id}`);
      })
      .catch(err => {
        console.log(err);
        req.flash('error', err.message || err);
        res.redirect('/posts/create');
      });
  } else {
    req.flash('error', '请将信息填写完整');
    res.render('edit');
  }
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id).then(data => {
    console.log('data', data);
    res.render('post', {post: data});
  });
});

module.exports =  router;