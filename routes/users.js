var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var checkLogin = require('../middlewares/check').checkLogin;
var avatarUpload = require('../middlewares/upload').avatarUpload;

/* GET users listing. */
router.get('/', checkNotLogin, function(req, res) {
  // TODO user page
  res.send('respond with a resource');
});
//
router.get('/profile/edit', checkLogin, (req, res) => {
  userModel.getProfileByName(req.session.user.username)
    .then(profile => {

      res.render('profile', {profile,});
    })
    .catch(err => {
      // TODO 错误处理
    });
});
router.post('/profile/edit', checkLogin, (req, res) => {
  // TODO 对象解构
  console.log(req.body);
  userModel.updateProfileByName(req.session.user.username, {
    intro: req.body.intro,
    sex: req.body.sex,
    birth: req.body.birth,
    email: req.body.email
  })
    .then(profile => {
      console.log(profile);
      // TODO user page render
      // TODO avatar 路径自动处理
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('back');
    });
});
router.post('/profile/avatar',checkLogin, avatarUpload, (req, res) => {
  console.log('req.file', req.file);
  userModel.updateProfileByName(req.session.user.username, {avatar: req.file.destination.replace('public', '') + '/' + req.file.filename})
    .then(user => {
      console.log(user);
      // TODO JSON 格式数据返回, 前端AJAX处理消息显示
    })
    .catch(err => {
      // TODO 同上
    });
});
// 根据ID查询头像
router.get('/profile/avatar', (req, res) => {
  // TODO
});

router.get('/signup', checkNotLogin, (req, res) => {
  res.render('signup');
});

router.post('/signup', checkNotLogin, (req, res) => {
  if (!req.body.username) {
    req.flash('error', '用户名不能为空');
    res.redirect('/u/signup');
  }
  userModel.getProfileByName(req.body.username)
    .then(user => {
      if (!!user) throw new Error('该用户名已经被注册');
      // if (req.body.password !== req.body.repassword) throw new Error('两次输入密码不一致');
      // if (req.body.password.length < 10) throw new Error('密码不能小于10个字符');
      return userModel.createUser(req.body)
    })
    .then(user => {
      console.log(user);
      if (user) {
        req.flash('success', '注册成功, 请登录');
        res.redirect('/u/login');
      }
    })
    .catch(err => {
      console.log(err);
      req.flash('error', err.message || err.errors);
      res.redirect('/u/signup');
    });
});

router.get('/login', checkNotLogin, (req, res) => {
  res.render('login');
});

router.post('/login', checkNotLogin, (req, res) => {
  userModel.getProfileByName(req.body.username)
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
      res.redirect('/u/login');
    });
});

router.get('/logout', checkLogin, (req, res, next) => {
  req.session.user = null;
  req.flash('success', '退出成功');
  res.redirect('/post/all');
});

module.exports = router;
