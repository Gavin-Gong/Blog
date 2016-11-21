let router = require('express').Router();
const {checkLogin} = require('../middlewares/check');
let postModel = require('../models/post');

// TODO /admin -> 子域名
router.get('/', (req, res) => {
  postModel.getPosts()
    .then(posts => {
      console.log('posts', posts);
      res.render('admin', {posts,});
    });
});

module.exports = router;