var express = require('express');
var path = require('path');

// middleware
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var multer = require('multer');
// './public/images/avatar'
var storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/images/avatar'),
  filename (req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + 'user' + Date.now() + '.jpeg');
  }
});
var upload = multer({storage,});
// require router
var index = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');

// db
var postsModel = require('./models/posts');

var app = express();

// app.locals
// TODO global variables setting
app.locals.year = 2016;

// express setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view cache', false);

// connect mongodb
mongoose.connect('mongodb://localhost/test');


// use middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret_key',
  store: new MongoStore({
    url: 'mongodb://localhost/test',
    autoRemove: 'native'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// router setting
app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);

// try some feature & delete me in the end
// app.get('/test', (req, res) => {
//   console.log('avatar file', req.file);
//   res.render('user');
// });
// app.post('/test',upload.single('avatar'), (req, res) => {
//   console.log('avatar file', req.file);
//   // res.render('user');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  // app.locals.pretty = false;
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktrace leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
