const path = require('path');

let config = {
  //
  host: 'lcoalhost',
  port: 3000,
  db: 'mongodb://localhost/test',
  session_secret: 'secret_key',

  // 头像路径
  avatar: {
    url: '/images/avatar/',
    path: path.resolve(__dirname, 'public/images/avatar/'),
  },

  // 信息配置
  name: '网站名字',
  description: 'description',
  keywords: 'keywords',

};

module.exports = config;
