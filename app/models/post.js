'use strict';

/*var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  slug: String,
  url: String,
  description: String,
  tags: [String],
  post: String
});

PostSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Post', PostSchema);*/

function Post (opts) {
  if(!opts) opts = {};
  this.title = opts.title || '';
  this.slug = opts.slug || '';
  this.url = opts.url || '';
  this.description = opts.description || '';
  this.tags = opts.tags || [''];
  this.text = opts.text || '';
}

module.exports = Post;

