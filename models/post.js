var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timePlugin = require('../lib/mongoPlugin').timePlugin;

var postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: String,
  content: {
    type: String,
    required: true,
  },
  tags: Array,
  posted_at: String,
  updated_at: String,
  // TODO comment array
  // comments: {
  //   type: Array,
  // }
});
postSchema.plugin(timePlugin);
// 定义方法
postSchema.method('test', function () {
  console.log(this);
});

var postModel = mongoose.model('posts', postSchema);

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


