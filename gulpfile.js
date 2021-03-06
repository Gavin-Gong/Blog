// 功能
// watch sass文件的变化 -> 编译 -> 刷新浏览器
//
let path = require('path');
let exec = require('child_process').exec;

// node-sass gulp-nodemon browser-sync k
let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let sass = require('gulp-sass');
let bs = require('browser-sync');
let reload = bs.reload;

let dbPath = 'C:\\Program Files\\MongoDB\\Server\\3.2\\bin';
let templateDir = path.join(__dirname, 'views');
let publicDir = path.join(__dirname, 'public');

// src folder
let sassFolder = path.join(__dirname, 'src/sass');
// let jsFolder = path.join(__dirname, 'src/javascripts');

// dist folder
let styleFolder = path.join(publicDir, 'stylesheets')


gulp.task('nodemon', () => {
  nodemon({
    env: {'NODE_ENV': 'development'},
    // watch: ['./routes', './app.js'],
  });
});

gulp.task('sass', () => {
  return gulp.src(path.join(sassFolder, '**/*.sass'))
    .pipe(sass())
    .pipe(gulp.dest(styleFolder));
});

// open mongodb on windows
gulp.task('mongodb', () => {
  let commands = [`cd ${dbPath}`, 'mongod'].join(' && ');
  exec(commands, (err, out, code) => {
    if(err) console.log(err.message);
  });
});

gulp.task('reload', () => {
  bs.reload();
});

gulp.task('default', ['mongodb', 'sass', 'nodemon'], () => {
  console.log('sass changed');
    bs.init({
      proxy: "localhost:8890/"
  });
  gulp.watch(path.join(sassFolder, '**/*'), ['sass']).on('change', bs.reload);
  gulp.watch(path.join(templateDir, '**/*')).on('change', bs.reload);
});
