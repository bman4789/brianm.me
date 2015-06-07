var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

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
    script: 'app.js',
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
  gulp.src('./app/views/layouts/main.handlebars')
    // inject css files
    .pipe($.inject(gulp.src(['./public/css/*.css'], {read: false}), {ignorePath:'public'}))
    // inject js files
    .pipe($.inject(gulp.src(['./public/js/*.js'], {read: false}), {ignorePath:'public'}))
    // inject bower dependencies
    .pipe($.inject(gulp.src(require('main-bower-files')(), {read: false}), {name:'bower', ignorePath:'public'}))
    .pipe(gulp.dest('./app/views/layouts'));
});
