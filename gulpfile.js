/* Gulp.js for hirokoymj.com */
'use strict';

var gulp = require('gulp'),
  include = require('gulp-include'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  util = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  minifycss = require('gulp-clean-css'),
  c = {
    sass_files : 'sass/**/*.scss',
    css_output : 'css/',
    map_path : './maps'
  };



// Task - Compiling Sass to CSS
gulp.task('sass:compile:colors', function () {
    // source will need to be changed to sass/**/*.scss
    // to watch for any sass file modifications
  return gulp.src(c.sass_files)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 4 versions'],
          cascade: false
        }))
        .pipe(minifycss({debug: true}, function(details) {
          var szReducedBy = ((details.stats.originalSize - details.stats.minifiedSize) / details.stats.originalSize) * 100;
          console.log(details.name + ' size before minification: ' + details.stats.originalSize + ' bytes');
          console.log(details.name + ' size after minification: ' + details.stats.minifiedSize + ' bytes');
          console.log('File size reduced by ' + szReducedBy.toFixed(2, 10) + '%');
        }))
        .pipe(sourcemaps.write(c.map_path))
        .pipe(gulp.dest(c.css_output));
});

// Task - Compiling Sass to CSS with compact style
gulp.task('sass', function () {
    return gulp.src(c.sass_files)
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(gulp.dest(c.css_output));
});

// Task - Watch
gulp.task('watch', function () {
  //gulp.watch(c.sass_files, ['sass:compile:colors']);
    gulp.watch(c.sass_files, ['sass']);
});

gulp.task('default', ['watch']);
