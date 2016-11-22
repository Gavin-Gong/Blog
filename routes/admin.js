let router = require('express').Router();
const {checkLogin, checkAdmin} = require('../middlewares/check');
let postModel = require('../models/post');

// TODO /admin -> 子域名
router.get('/', checkLogin, checkAdmin, (req, res) => {
  postModel.getPosts()
    .then(posts => {
      res.render('admin', {posts,});
    });
});

module.exports = router;