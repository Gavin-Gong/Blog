let express = require('express');

// controllers
let home = require('./controllers/index');
let post= require('./controllers/post');
let user = require('./controllers/user');
let comment = require('./controllers/comment');
let admin = require('./controllers/admin');

// middlewares
const { checkSignIn, checkNotSignIn, checkAdmin } = require('./middlewares/check');
const { avatarUpload }= require('./middlewares/upload');

let router = express.Router();

//home controller
router.get('/', home.index);

// post controller
router.get('/post/all', post.showAllPost);
router.get('/post/:post_id/detail', post.showSinglePost);

router.get('/post/create',checkSignIn, checkAdmin, post.showWriteMode);
router.post('/post/create', checkSignIn, checkAdmin, post.createPost);

router.post('/post/save', checkSignIn, checkAdmin, post.saveDraft);
router.get('/post/:post_id/enable', checkSignIn, checkAdmin, post.enablePost);
router.get('/post/:post_id/disable', checkSignIn, checkAdmin, post.disablePost);

router.get('/post/:post_id/edit', checkSignIn, checkAdmin, post.showEditMode);
router.post('/post/:post_id/edit', checkSignIn, checkAdmin, post.showEditMode);

router.get('/post/:post_id/remove', checkSignIn, checkAdmin, post.delPost);

router.get('/post/:post_id/dl', post.dlSinglePost);

// comment
router.post('/post/:post_id/comment', comment.addComment);
router.get('/comment/:comment_id/remove', comment.delComment);

// user controller
router.get('/u', checkSignIn, user.showUser);

router.get('/u/profile/edit', checkSignIn, user.showEdit);
router.post('/u/profile/edit', checkSignIn, user.update);

router.get('/u/:username/avatar', user.getAvatar);
router.post('/u/profile/avatar', checkSignIn, avatarUpload, user.uploadAvatar); // TODO add middleware

router.get('/u/signup', user.showSignUp);
router.post('/u/signup', user.signUp);

router.get('/u/signin', checkNotSignIn, user.showSignIn);
router.post('/u/signin', checkNotSignIn, user.signIn);

router.get('/u/signout', checkSignIn, user.signOut);

// admin controller
router.get('/u/admin', checkSignIn, checkAdmin, admin.index);

module.exports = router;

