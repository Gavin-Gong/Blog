var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var checkLogin = require('../middlewares/check').checkLogin;

/* GET users listing. */
router.get('/', checkNotLogin, function(req, res) {
  // TODO user page
  res.send('respond with a resource');
});

router.get('/signup', checkNotLogin, (req, res) => {
  res.render('signup');
});
router.post('/signup', checkNotLogin, (req, res) => {
  if (req.body.username) throw new Error('用户名不能为空');
  userModel.findOne({username: req.body.username})
    .then(user => {
      if (!!user) throw new Error('该用户名已经被注册');
      if (req.body.password !== req.body.repassword) throw new Error('两次输入密码不一致');
      if (req.body.password.length < 10) throw new Error('密码不能小于10个字符');
      req.flash('success', '注册成功, 请登录');
      res.redirect('/users/login');
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('/users/signup');
    });
});

router.get('/login', checkNotLogin, (req, res) => {
  res.render('login');
});

router.post('/login', checkNotLogin, (req, res) => {
  userModel.findOne({username: req.body.username})
    .then(user => {
      console.log(user);
      if (user && user.password === req.body.password) {
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
      } else {
        throw new Error('用户名或密码错误');
      }
    }).catch(err => {
      req.flash('error', err.message);
      res.redirect('/users/login');
    });
});

router.get('/logout', checkLogin, (req, res, next) => {
  req.session.user = null;
  req.flash('success', '退出成功');
  res.redirect('/posts/all');
});
module.exports = router;
