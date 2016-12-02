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
  // -1 -> 草稿, 0 -> 未发布, 1 -> 发布
  status: {
    type: Number,
    enum: [-1, 0, 1],
    default: 1
  },
  posted_at: String,
  updated_at: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
});
postSchema.plugin(timePlugin);
// TODO
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
  saveDraft (post) {
    return postModel.create(Object.assign(post, {status: -1}));
  },
  disablePostById (id) {
    return postModel.findByIdAndUpdate(id, {$set: {status: 0}});
  },
  enablePostById (id) {
    return postModel.findByIdAndUpdate(id, {$set: {status: 1}});
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
      // 返回markdown格式string
      return data;
    });
  },
  getRawPostById (id) {
    return postModel.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'comment_from',
        model: 'users'
      }
    });
  },
  updatePostById (id, obj) {
    return postModel.findByIdAndUpdate(id, obj);
  },
  delPostById (id) {
    return postModel.findByIdAndRemove(id);
  },
};


