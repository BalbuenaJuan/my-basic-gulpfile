/**
 * Created by Juan on 02/08/2016.
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    server = require('gulp-server-livereload');
    data = require('gulp-data'),
    stylus = require('gulp-stylus'),
    tinypng = require('gulp-tinypng-compress'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('js', function(){
   gulp.src(['static/js/loquesea.js',
       'static/js/loquesea.js',
       'static/js/loquesea.js',
       'static/js/loquesea.js'])
       .pipe(concat('app.js'))
       .pipe(uglify())
       .pipe(gulp.dest('static/build/'))
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('stylus', function () {
    return gulp.src('static/css/style.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('static/css/style.css'));
});

gulp.task('prefix', function () {
        gulp.src('./static/css/style.css')
            .pipe(autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./static/css/'))
        });

gulp.task('cssnano', function () {
    return gulp.src('static/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('static/build/'));
});

gulp.task('images', function () {
    gulp.src(['static/img/*.{png,jpg,jpeg}',
        'static/img/index/*.{png,jpg,jpeg}',
        'static/img/outdoor/*.{png,jpg,jpeg}'])
        .pipe(tinypng({
            key: 'MY_API_KEY',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('images'));
});

gulp.task('the_css', ['css', 'prefix', 'cssnano']);

gulp.task('statics', ['css', "prefix", 'cssnano', 'js', 'images']);