var userModel = require('../models/user');

// checkSignIn
// GET -> /u/
exports.showUser = (req, res) => {
  // TODO user.jade
  res.render('user');
};

// checkSignIn
// GET -> /u/profile/edit
exports.showEdit = (req, res, next) => {
  userModel.getProfileByName(req.session.user.username)
    .then(profile => {
      res.render('profile', {profile,});
    })
    .catch(err => {
      // TODO 错误处理
    });
};

// checkSignIn
// POST -> /u/profile/edit
exports.update = (req, res, next) => {
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
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('back');
    });
};

//checkSignIn
// POST -> u/profile/avatar
exports.uploadAvatar = (req, res, next) => {
  console.log('req.file', req.file);
  userModel.updateProfileByName(req.session.user.username, {avatar: req.file.destination.replace('public', '') + '/' + req.file.filename})
    .then(user => {
      console.log(user);
      // TODO JSON 格式数据返回, 前端AJAX处理消息显示
    })
    .catch(err => {
      // TODO 同上
    });
};
// GET -> /u/:user_id/avatar
exports.getAvatar = (req, res, next) => {
  // TODO
};

// checkNotSignIn
// GET -> /u/signup
exports.showSignUp = (req, res) => {
  res.render('signup');
};

// checkNotSignIn
// POST -> u/signup
exports.signUp = (req, res) => {
  if (!req.body.username) {
    req.flash('error', '用户名不能为空');
    res.redirect('/u/signup');
  }
  userModel.getProfileByName(req.body.username)
    .then(user => {
      if (!!user) throw new Error('该用户名已经被注册');
      if (req.body.password !== req.body.repassword) throw new Error('两次输入密码不一致');
      if (req.body.password.length < 10) throw new Error('密码不能小于10个字符');
      return userModel.createUser(req.body)
    })
    .then(user => {
      console.log(user);
      if (user) {
        req.flash('success', '注册成功, 请登录');
        res.redirect('/u/signin');
      }
    })
    .catch(err => {
      console.log(err);
      req.flash('error', err.message || err.errors);
      res.redirect('/u/signup');
    });
};

// checkNotSignIn
// GET -> u/signin
exports.showSignIn = (req, res) => {
  res.render('signin')
};

// checkNotSignIn
// POST -> u/signin
exports.signIn = (req, res) => {
  userModel.getProfileByName(req.body.username)
    .then(user => {
      console.log(user);
      if (user && user.password === req.body.password) {
        req.session.user = user;
        req.app.locals.isSignIn = true;
        req.flash('success', '登录成功');
        res.redirect('/');
      } else {
        throw new Error('用户名或密码错误');
      }
    }).catch(err => {
    req.flash('error', err.message);
    res.redirect('/u/signin');
  });
};

// checkSignIn
// POST -> /u/signout
exports.signOut = (req, res) => {
  req.session.user = null;
  req.app.locals.isSignIn = true;
  req.flash('success', '退出成功');
  res.redirect('/');
};

