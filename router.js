let express = require('express');

// controllers
let home = require('./controllers/index');
let post= require('./controllers/post');
let user = require('./controllers/user');

// middlewares
const { checkSignIn, checkNotSignIn, checkAdmin } = require('./middlewares/check');
const { avatarUpload }= require('./middlewares/upload');

let router = express.Router();

//home
router.get('/', home.index);

// post controller
router.get('/post/all', post.showAllPost);
router.get('/post/:post_id/detail', post.showSinglePost);

router.get('/post/create',checkSignIn, checkAdmin, post.showWriteMode);
router.post('/post/create', checkSignIn, checkAdmin, post.createPost);

router.get('/post/:post_id/edit', checkSignIn, checkAdmin, post.showEditMode);
router.post('/post/:post_id/edit', checkSignIn, checkAdmin, post.showEditMode);

router.post('/post/:post_id/delete', checkSignIn, checkAdmin, post.delPost);
module.exports = router;

// user controller
router.get('/u', checkSignIn, user.showUser);

router.get('/u/profile/edit', checkSignIn, user.showEdit);
router.post('/u', checkSignIn, user.update);

router.get('/u/:user_id/avatar', user.getAvatar);
router.post('/u/profile/avatar', checkSignIn, avatarUpload, user.uploadAvatar); // TODO add middleware

router.get('/u/signup', user.showSignUp);
router.post('/u/signup', user.signUp);

router.get('/u/signin', checkNotSignIn, user.showSignIn);
router.post('/u/signin', checkNotSignIn, user.signIn);

router.get('/u/signout', checkSignIn, user.signOut);


