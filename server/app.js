'use strict';

var express = require('express'),
  config = require('./config');

/*mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/!*.js');
models.forEach(function (model) {
  require(model);
});*/
var app = express();

require('./express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
