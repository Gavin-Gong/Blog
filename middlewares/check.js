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
    } else {
      req.app.locals.isSignIn = false;
    }
    next();
  }
};