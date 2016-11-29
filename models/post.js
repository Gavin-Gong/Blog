var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timePlugin = require('../lib/mongoPlugin').timePlugin;
let marked = require('marked');
let hightlight = require('highlight.js');
marked.setOptions({
  highlight (code) {
    return hightlight.highlightAuto(code).value;
  }
});

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
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
});
postSchema.plugin(timePlugin);
// 定义方法
postSchema.method('test', function () {
  console.log(this);
});

var postModel = mongoose.model('posts', postSchema);

module.exports = {
  getPosts () {
    return postModel.find({}).populate({
      path: 'comments',
      populate: {
        path: 'comment_from',
        model: 'users'
      }}).then(data => {
        data.forEach(item => {
          item.content = marked(item.content);
        });
      return data;
    });
  },
  createPost (post) {
    return postModel.create(post);
  },
  getPostById (id) {
    return postModel.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'comment_from',
        model: 'users'
      }
    }).then(data => {
      if (data && data.content) {
        data.content = marked(data.content);
      }
      return data;
    });
  },
  updatePostById (id, obj) {
    return postModel.findByIdAndUpdate(id, obj);
  },
  delPostById (id) {
    return postModel.findByIdAndRemove(id);
  },
};


