var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var htmlmin = require('gulp-htmlmin');
var image = require('gulp-image');
 
gulp.task('image', function () {
  gulp.src('./img/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img'));
});
  
gulp.task('minify', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
  gulp.src('js/**/*.js')
    .pipe(minify({
        ext:{
            min:'.js'
        },
        exclude: ['tasks'],
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['image', 'compress', 'minify', 'sass']);