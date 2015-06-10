var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');
var typographic = require('typographic');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
      server: {
        baseDir: './public'
      }
  });
});

// Jade Templates
gulp.task('jade', function() {
return gulp.src('src/*.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('public'))
  .pipe(browserSync.stream());
});


// Stylus styles
gulp.task('styles', function() {
return gulp.src('src/app.styl')
  .pipe(stylus({
    use: []
  }))
  .pipe(gulp.dest('public'))
  .pipe(browserSync.stream());
});

// ES6
gulp.task('babel', function () {
  return gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
});

// Whatch the tasks
gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/**/*.styl', ['styles']);
  gulp.watch('src/**/*.js', ['babel']);
});

gulp.task('default', ['babel', 'jade', 'styles', 'browser-sync', 'watch']);
