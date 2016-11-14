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
// TODO promise 重写
router.post('/signup', checkNotLogin, (req, res) => {
  console.log(req.body);
  userModel.find({username: req.username}, (err, user) => {
    if (err) throw err;
    console.log(user);
    if (!user.length && req.body['password'] === req.body['re-password']) {
      let newUser = new userModel({username: req.body.username, password: req.body.password});
      newUser.save(err => {
        if (err) throw err;
        console.log('注册成功');
        // TODO 跳转到注册成功页面
        res.redirect('/users/login');
      });
    } else {
      // TODO 错误页面
    }
  })
});

router.get('/login', checkNotLogin, (req, res) => {
  res.render('login');
});

router.post('/login', checkNotLogin, (req, res) => {
  console.log('body', req.body);
  console.log(req.session);
  userModel.find({username: req.body.username}, (err, user) => {
    console.log('data', user);
    if (user.length && user[0].password === req.body.password) {
      // TODO 记住登录状态
      req.session.user = user;
      req.flash('success', '登录成功');
      return res.redirect('/posts/all');
    }
    if (!user.length) {
      req.flash('error', '查无此人, 请先注册');
      return res.render('./signup');
    }
    if (user[0].password !== req.body.password) {
      req.flash('error', '密码错误');
      res.render('./login');
    }
  });
});

router.get('/logout', checkLogin, (req, res, next) => {
  req.session.user = null;
  res.redirect('/posts/all');
});
module.exports = router;
