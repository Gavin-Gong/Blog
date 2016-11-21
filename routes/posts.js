let router = require('express').Router();
let { checkNotLogin, checkLogin } = require('../middlewares/check');
let postModel = require('../models/post');

router.get('/all', (req, res) => {
  // TODO redirect if '/post'
  postModel.getPosts()
    .then(data => {
      res.render('posts', {posts: data});
    })
    .catch(err => {

    });
});

// TODO fixme 当文章id为create???,
router.get('/create', checkLogin, (req, res) => {
  res.render('edit');
});

router.post('/create', checkLogin, (req, res) => {
  console.log(req.body);
    postModel.createPost(req.body)
      .then(post => {
        console.log('create', post);
        req.flash('success', '发表成功');
        res.redirect(`/post/${post._id}`);
      })
      .catch(err => {
        console.log(err);
        if (err && err.name === 'ValidationError') {
          // console.log(err.errors);
          for (field in err.errors) {
            console.log(err.errors[field].message);
            // TODO 控制提示顺序
            // TDDO fixme 显示重复提示
            req.flash('error', err.errors[field].message);
          }
        }
        res.redirect('/post/create');
      });

});

router.get('/:id', (req, res) => {
  postModel.getPostById(req.params.id).then(data => {
    console.log('data', data);
    res.render('post', {post: data});
  });
});

router.get('/:id/edit', (req, res) => {
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
    })
});
// TODO 修改文章
router.get('/:id/remove', (req, res) => {
  postModel.delPostById(req.params.id)
    .then(found => {
      req.flash('success', '删除成功');
      res.redirect('/post/all');
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('back');
    });
});

module.exports =  router;