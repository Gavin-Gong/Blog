  // 可惜没es7支持 ==!, 不然可以对象解构
function validateFn(req, res, next) {
  req.getValidationResult().then(result => {
    if (result.array() && result.array().length) {
      req.flash('error', result.useFirstErrorOnly().array()[0].msg);
      res.redirect(req.originalUrl);
    } else {
      next();
    }
  });
}

module.exports = {
  validateSignUp (req, res, next) {
    req.checkBody({
      'username': {
        notEmpty: true,
        isLength: {
          options: [{min: 2, max: 8}],
          errorMessage: '用户名长度为2到8个字符'
        },
        errorMessage: '用户名不能为空'
      },
      'password': {
        notEmpty: true,
        isLength: {
          options:[{min: 6, max: 16}],
          errorMessage: '密码长度在6 - 16 个字符之间'
        },
        errorMessage: '密码不能为空'
      },
      'repassword': {
        notEmpty: true,
        matches: {
          options: [req.body.password],
          errorMessage: '密码不一致'
        },
        errorMessage: '确认密码不能为空'
      }
    });
    validateFn(req, res, next);
  },
  validateSignIn (req, res, next) {
    req.checkBody({
      'username': {
        notEmpty: true,
        isLength: {
          options: [{min: 2, max: 8}],
          errorMessage: '用户名长度为2到8个字符'
        },
        errorMessage: '用户名不能为空'
      },
      'password': {
        notEmpty: true,
        isLength: {
          options:[{min: 6, max: 16}],
          errorMessage: '密码长度在6 - 16 个字符之间'
        },
        errorMessage: '密码不能为空'
      },
    });
    validateFn(req, res, next);
  },
  validatePost (req, res, next) {
    req.checkBody({
      'title': {
        notEmpty: true,
        isLength: {
          options: [{min: 1, max:20}],
          errorMessage: '标题长度在1到20个字符之间'
        },
        errorMessage: '标题不能为空'
      },
      'content': {
        notEmpty: true,
        isLength: {
          options: [{min: 20, max: 5000}],
          errorMessage: '内容长度在20 - 5000之间'
        },
        errorMessage: '内容不能为空'
      }
    });
    validateFn(req, res, next);
  },
  validateProfile (req, res, next) {
    console.log(req.body);
    for (let prop in req.body) {
      // filter empty string or array
      if ((Array.isArray(req.body[prop]) && !req.body[prop].length) || !req.body[prop]) delete req.body[prop];
    }
    console.log(req.body);
    req.checkBody({
      'intro': {
        optional: true,
        isLength: {
          options: [{min: 0, max:40}],
          errorMessage: '简介长度在1到40个字符之间'
        },
        errorMessage: '标题不能为空'
      },
      'sex': {
        optional: true,
        isSex: {
          errorMessage: '输入性别有误'
        },
        errorMessage: '内容不能为空'
      },
      'birth': {
        optional: true,
        errorMessage: '内容不能为空'
      },
      'email': {
        optional: true,
        isEmail: {
          errorMessage: '请填写正确的email地址'
        },
        errorMessage: '内容不能为空'
      }
    });
    validateFn(req, res, next);
  },
  validateComment (req, res, next) {
    console.log(req.body);
    req.checkBody({
      'comment': {
        notEmpty: true,
        isLength: {
          options: [{min: 10, max: 150}],
          errorMessage: '请将字数限制在10到150之间'
        },
        errorMessage: '评论不能为空'
      }
    });
    req.checkParams('post_id', '错误的文章id').isMongoId();
    req.getValidationResult().then(result => {
      if (result.array() && result.array().length) {
        req.flash('error', result.useFirstErrorOnly().array()[0].msg);
        res.redirect('/');
      } else {
        next();
      }
    });
  }
};
