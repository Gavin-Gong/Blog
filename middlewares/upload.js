var path = require('path');
var multer = require('multer');


var avatarStorage = multer.diskStorage({
  // TODO 优化路径
  destination: 'public/images/avatar',
  filename (req, file, cb) {
    console.log(file);
    // TODO set extname auto
    // TODO 错误处理
    // cb(null, `${req.params.id}.jpg`);
    cb(null, `${req.session.user.username}.jpg`);
  }
});

module.exports.avatarUpload = multer({storage: avatarStorage}).single('avatar');