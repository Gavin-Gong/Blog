let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schema
// mongoose plugin global add created_at & updated_at
let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  intro: String,
  gender: String,
  email: String,
  sex: String,
  birth: String,
  isAdmin:{ type: Boolean, default: false }
});
// TODO 密码加密存储
let Users = mongoose.model('users', userSchema);

module.exports = Users;