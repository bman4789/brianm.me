'use strict';

var express = require('express'),
  router = express.Router(),
  Post = require('../models/post');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var posts = [new Post({
    "title": "dummy posty"
  }), new Post()];
  res.render('index', {
    title: 'Brian Mitchell',
    active: {active_home: true},
    posts: posts
  });
});
