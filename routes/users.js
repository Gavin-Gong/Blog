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
  res.render('login');
});

router.post('/login', (req, res) => {
  userModel.find({username: req.body.username},);
})

module.exports = router;
