const { getAvatar } = require('../models/user');

module.exports = {
  checkSignIn (req, res, next) {
    if (!req.session.user) {
      req.flash('error', '尚未登录');
      return res.redirect('/u/signin');
    }
    next();
  },
  checkNotSignIn (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('back');
    }
    next();
  },
  checkUser (req, res, next) {
    if (!req.session.admin) {
      req.flash('error', '权限不够');
      return res.redirect('back');
    }
    next();
  },
  checkAdmin (req, res, next) {
    if (req.session.user && !req.session.user.is_admin) {
      req.flash('error', '无权限操作');
      return res.redirect('back');
    }
    next();
  },
  setUserState (req, res, next) {
    if (req.session && req.session.user) {
      req.app.locals.isSignIn = true;
      // session 更新是有时间限制的, 可能db更新但是session没更新
      getAvatar(req.session.user.username).then(({avatar}) => {
        console.log(avatar);
        req.app.locals.avatar_url = avatar;
      }).catch(err => {
        req.flash('error', '没有找到该用户的头像');
      });
    } else {
      req.app.locals.isSignIn = false;
    }
    next();
  }
};
