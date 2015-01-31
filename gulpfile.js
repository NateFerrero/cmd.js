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

var readme = 'readme/*.md';

gulp.task('readme', function() {
  return gulp.src(readme)
    .pipe(concat('README.md'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(lib, ['lib']);
    gulp.watch(readme, ['readme']);
});

gulp.task('default', ['lib', 'readme']);
gulp.task('start', ['default', 'watch']);
