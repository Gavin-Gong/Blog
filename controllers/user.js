let userModel = require('../models/user');
let commentModel = require('../models/comment');
let config = require('../config.default');
let sha1 = require('sha1');

// checkSignIn
// GET -> /u/
exports.showUser = (req, res) => {
  let profilePromise = userModel.getProfileByName(req.session.user.username);
  let commentPromise = commentModel.getCommentsByUserId(req.session.user._id);

  Promise.all([profilePromise, commentPromise]).then(([profile, comments]) => {
    allowed_comments = comments.filter(item => item.is_allow);
    not_allowed_comments = comments.filter(item => !item.is_allow);
    res.render('user', {profile, comments, allowed_comments, not_allowed_comments});
  })
    .catch(err => {
      console.log(err || err.message);
    });
};


// checkSignIn
// GET -> /u/profile/edit
exports.showEdit = (req, res) => {
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
exports.update = (req, res) => {
  console.log(req.body);
  userModel.updateProfileByName(req.session.user.username, req.body)
    .then(profile => {
      console.log(profile);
      req.flash('success', '修改成功');
      res.redirect(req.originalUrl);
    })
    .catch(err => {
      req.flash('error', err.message);
      res.redirect('back');
    });
};

//checkSignIn
// POST -> u/profile/avatar
exports.uploadAvatar = (req, res) => {
  console.log('req.file', req.file);
  const path = config.avatar.url + req.file.filename;
  console.log(path);
  userModel.updateAvatar(req.session.user.username, path)
    .then(user => {
      req.flash('success', '头像上传成功');
      res.redirect(req.originalUrl);
    })
    .catch(err => {
      //
    });
};
// GET -> /u/:user_name/avatar
exports.getAvatar = (req, res) => {
  userModel.getAvatar(req.params.username)
    .then(avatar => {
      res.json(avatar);
    });
};

// checkNotSignIn
// GET -> /u/signup
exports.showSignUp = (req, res) => {
  res.render('signup');
};

// checkNotSignIn
// POST -> u/signup
exports.signUp = (req, res) => {
  console.log('I am Here');

  userModel.getProfileByName(req.body.username)
    .then(user => {
      req.body.password = sha1(req.body.password);
      // 从用户体验讲, 这部分应该放表单验证前面 -> 重构可以考虑加个查用户是否被注册的接口解决
      if (user) throw new Error('该用户已经被注册');
      return userModel.createUser(req.body)
    })
    .then(user => {
      if (user) {
        req.flash('success', '注册成功, 请登录');
        res.redirect('/u/signin');
      }
    })
    .catch(err => {
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
      if (user && user.password === sha1(req.body.password)) {
        req.session.user = user;
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
  req.flash('success', '退出成功');
  res.redirect('/');
};


