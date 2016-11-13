var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
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


router.get('/login', (req, res) => {
  console.log('flash', req.flash('success'));
  console.log('login');
  res.render('login');
});

router.post('/login', (req, res) => {
  console.log('body', req.body);
  console.log(req.session);
  userModel.find({username: req.body.username}, (err, user) => {
    console.log('data', user);
    if (user.length && user[0].password === req.body.password) {
      // TODO 记住登录状态
      req.session.cookie.isLogin = true;
      req.flash('success', '登录成功');
      console.log('登录成功');
      return res.redirect('/posts/all');
    }
    if (!user.length) {
      console.log('no this user');
      req.flash('error', '查无此人');
      res.render('./login');
      return;
    }
    if (user[0].password !== req.body.password) {
      req.flash('error', '密码错误');
      res.render('./login');
    }
  });
});

module.exports = router;
