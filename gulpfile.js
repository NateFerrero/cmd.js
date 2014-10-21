var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var lib = 'lib/*.js';

gulp.task('lib', function() {
  return gulp.src(lib)
    .pipe(jshint())
    .pipe(concat('cmd.lib.js')) 
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(lib, ['lib']);
});

gulp.task('default', ['lib', 'watch']);
