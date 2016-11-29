let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const { timePlugin } = require('../lib/mongoPlugin');

// schema
let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/images/default_avatar.jpg'
  },
  intro: String,
  email: String,
  sex: {
    type: String,
    enum: ['man', 'female']
  },
  birth: String,
  // TODO 第一位注册用户为管理员
  is_admin:{ type: Boolean, default: false }
});
userSchema.plugin(timePlugin);
// TODO 密码加密存储
let userModel = mongoose.model('users', userSchema);

module.exports = {
  getProfileByName (name) {
    return userModel.findOne({username: name});
  },
  updateProfileByName (name, profile) {
    // TODO 对象解构
    return userModel.findOneAndUpdate({username: name}, profile)
  },
  createUser (profile) {
    return userModel.create(profile);
  },
  getAvatar (username) {
    return userModel.findOne({username}, {avatar: 1});
  }
};
