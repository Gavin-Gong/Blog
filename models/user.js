let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let timePlugin = require('../lib/mongoPlugin').timePlugin;

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
  avatar: String,
  intro: String,
  email: String,
  sex: {
    type: String,
    enum: ['man', 'female']
  },
  birth: String,
  isAdmin:{ type: Boolean, default: false }
});
userSchema.plugin(timePlugin);
// TODO 密码加密存储
let userModel = mongoose.model('users', userSchema);

// module.exports = Users;
module.exports = {
  getProfileByName (name) {
    return userModel.findOne({username: name});
  },
  updateProfileByName (name, profile) {
    // TODO 对象解构
    return userModel.findOneAndUpdate({username: name}, profile)
  },
};