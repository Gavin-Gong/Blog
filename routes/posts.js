let router = require('express').Router();
var Posts = require('../models/posts');

router.get('/all', (req, res, next) => {
  // TODO redirect if '/post'
  Posts.find({}).then(data => {
    res.render('posts', {posts: data})
  });
  next();
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id).then(data => {
    console.log('data', data);
    res.render('post', {post: data});
  });
});

module.exports =  router;