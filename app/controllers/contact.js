'use strict';

var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/contact', function (req, res, next) {
  res.render('contact', {
    title: 'Contact | Brian Mitchell',
    pageTitle: 'Contact',
    active: {active_contact: true}
  });
});
