var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timePlugin = require('../lib/mongoPlugin').timePlugin;

var postSchema = new Schema({
  title: {
    type: String,
    required: [true, '标题不能为空'],
    minlength: [6, '标题不能小于6个字符'],
    maxlength: [25, '标题不能大于25个字符']
  },
  link: String,
  content: {
    type: String,
    required: [true, '内容不能为空'],
    maxlength: [90000, '内容过长'],
    minlength: [20, '内容不能小于20个字符']
  },
  tags: Array,
  posted_at: String,
  updated_at: String
});
postSchema.plugin(timePlugin);
// 定义方法
postSchema.method('test', function () {
  console.log(this);
});

var postModel = mongoose.model('Posts', postSchema);

module.exports = {
  getPosts () {
    return postModel.find({});
  },
  createPost (post) {
    return postModel.create(post);
  },
  getPostById (id) {
    return postModel.findById(id);
  },
  updatePostById (id) {
    return postModel.findByIdAndRemove(id);
  },
  delPostById (id) {
    return postModel.findByIdAndRemove(id);
  },

};
// TODO add hot


