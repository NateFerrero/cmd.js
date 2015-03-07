'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var lib = 'src/lib/*.js';

gulp.task('lib', function() {
  return gulp.src(lib)
    .pipe(jshint())
    .pipe(concat('cmd.lib.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch(lib, ['lib']);
});

gulp.task('default', ['lib']);
gulp.task('start', ['default', 'watch']);
