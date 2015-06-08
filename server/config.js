'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'brianm-me'
    },
    port: 3000,
    db: 'mongodb://localhost/brianm-me-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'brianm-me'
    },
    port: 3000,
    db: 'mongodb://localhost/brianm-me-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'brianm-me'
    },
    port: 3000,
    db: 'mongodb://localhost/brianm-me-production'
  }
};

module.exports = config[env];
