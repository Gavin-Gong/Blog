let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schema

let userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  // avatar: String,
  bio: String,
  age: Number,
  gender: String,
  email: String
});

let Users = mongoose.model('users', userSchema);

module.exports = Users;