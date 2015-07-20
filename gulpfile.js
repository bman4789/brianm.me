'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'del', 'streamqueue']
});
var bowerFiles = require('main-bower-files');

gulp.task('sass', function () {
  gulp.src('./public/css/*.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe(gulp.dest('./public/css'))
    .pipe($.livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('serve', ['inject'], function () {
  $.livereload.listen();
  $.nodemon({
    script: 'server/app.js',
    ext: 'js coffee handlebars'
  }).on('restart', function () {
    setTimeout(function () {
      $.livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('serve:dist', ['build'], function () {
  $.livereload.listen();
  $.nodemon({
    script: 'dist/server/app.js',
    ext: 'js coffee handlebars'
  }).on('restart', function () {
    setTimeout(function () {
      $.livereload.changed(__dirname);
    }, 500);
  });
});


gulp.task('lint', function() {
  return gulp.src(['./public/js/*.js', './app/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('inject', function(){
  //making an array of bower components, and specific files that aren't listed as main (ie. plugins within a library)
  var bower = bowerFiles();
  bower.push('./public/components/foundation/js/foundation/foundation.topbar.js');
  bower.push('./public/components/modernizr/modernizr.js');
  return gulp.src('./app/views/layouts/main.handlebars')
    // inject css files
    .pipe($.inject(gulp.src(['./public/css/*.css'], {read: false}), {ignorePath:'public'}))
    // inject js files
    .pipe($.inject(gulp.src(['./public/js/*.js'], {read: false}), {ignorePath:'public'}))
    // inject bower dependencies
    .pipe($.inject(gulp.src(bower, {read: false}), {name:'vendor', ignorePath:'public'}))
    .pipe(gulp.dest('./app/views/layouts'));
});


gulp.task('build', function(callback) {
  // runSequence is a cool way of choosing what must run sequentially, and what in parallel
  // here, the task clean will run first alone, then all the builds in parallel, then the copies in parallel, then the injection in html
  require('run-sequence')(
    'lint',
    'clean',
    ['build-scripts', 'build-scripts-bower', 'build-styles', 'build-styles-bower'],
    ['copy-server', 'copy-app', 'copy-images', 'copy-assets', 'copy-public-root'],
    'build-inject',
    callback);
});

// clean the dist folder
gulp.task('clean', function(cb){
  //removes everything except a .git folder
  return $.del(['dist/**/*', '!dist /.git'], cb);
});

// concatenate and minify the js scripts into one single app.js file, then copy it to dist folder
gulp.task('build-scripts', function() {
  return gulp.src(['./public/js/*.js'])
    .pipe($.concat('app.js')) // concatenate all js files
    .pipe($.uglify()) // minify js
    .pipe($.rev()) // add a unique id at the end of app.js (ex: app-f4446a9c.js) to prevent browser caching when updating the website
    .pipe(gulp.dest('./dist/public')); // copy app-**.js to the appropriate folder
});

// same as above, with the bower files
gulp.task('build-scripts-bower', function() {
  var bower = bowerFiles();
  bower.push('./public/components/foundation/js/foundation/foundation.topbar.js');
  bower.push('./public/components/modernizr/modernizr.js');
  return gulp.src(bower)
    .pipe($.filter(['*.js']))
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe($.rev())
    .pipe(gulp.dest('./dist/public'));
});

// yet another concat/minify task, here for the CSS
gulp.task('build-styles',function() {
  return gulp.src(['./public/css/*.css'])
    .pipe($.concat('app.css'))
    .pipe($.minifyCss())
    .pipe($.rev())
    .pipe(gulp.dest('./dist/public'));
});

// and for vendor CSS
gulp.task('build-styles-bower', function() {
  return gulp.src(bowerFiles())
    .pipe($.filter(['*.css']))
    .pipe($.concat('vendor.css'))
    .pipe($.minifyCss())
    .pipe($.rev())
    .pipe(gulp.dest('./dist/public'));
});

// simple task to copy the server folder to dist/server
gulp.task('copy-server', function(){
  return gulp.src('./server/**/*.*')
    .pipe(gulp.dest('./dist/server'));
});

// simple task to copy the app folder to server/app
gulp.task('copy-app', function(){
  return gulp.src('./app/**/**/*.*')
    .pipe(gulp.dest('./dist/app'));
});

// copying the images
gulp.task('copy-images', function() {
  return gulp.src('./public/img/**/*.*')
    .pipe(gulp.dest('./dist/public/img'));
});

// copying the assets
gulp.task('copy-assets', function() {
  return gulp.src('./public/assets/**/*.*')
    .pipe(gulp.dest('./dist/public/assets'));
});

// copying the root level public files
gulp.task('copy-public-root', function(){
  return gulp.src('./public/*.*')
    .pipe(gulp.dest('./dist/public/'));
});

gulp.task('build-inject', function(){
  return gulp.src('./dist/app/views/layouts/main.handlebars')
    .pipe($.inject(gulp.src('./dist/public/app*.css', {read: false}), {ignorePath:'dist/public'}))
    .pipe($.inject(gulp.src('./dist/public/vendor*.css', {read: false}), {name:'vendor', ignorePath:'dist/public'}))
    .pipe($.inject(gulp.src('./dist/public/app*.js', {read: false}), {ignorePath:'dist/public'}))
    .pipe($.inject(gulp.src('./dist/public/vendor*.js', {read: false}), {name:'vendor', ignorePath:'dist/public'}))
    .pipe(gulp.dest('./dist/app/views/layouts'));
});
