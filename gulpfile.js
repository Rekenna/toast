'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del')
var livereload = require('gulp-livereload')
var util = require('gulp-util')
var size = require('gulp-size')
var zip = require('gulp-zip')

// Error Alerts
function errorAlert(error){
	notify.onError({
		title: "Error compiling file",
		message: 'Check your terminal.',
		sound: "Sosumi"
	})(error); //Error Notification
	console.log(error);
	this.emit("end"); //End function
};

//
// Styles
//
gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

//
// Scripts
//
gulp.task('js', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./src/scripts/**/*.js', ['js']);
});

//
// Twig
//
gulp.task('twig', function () {
  return gulp.src('./src/views/**/*.twig')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(gulp.dest('./dist/views'));
});

gulp.task('twig:watch', function () {
  gulp.watch('./src/views/**/*.twig', ['twig']);
});

//
// Images
//
gulp.task('images', function () {
  return gulp.src('./src/images/**/*.{png,svg,jpg,gif}')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('images:watch', function () {
  gulp.watch('./src/images/**/*.{png,svg,jpg,gif}', ['images']);
});

//
// Clean
//
gulp.task('clean', del.bind(null, ['dist', 'build', '*.zip']));

//
// Build & Zip
//
gulp.task('build', ['js', 'sass', 'twig', 'images'], function() {
  gulp.src('dist/**/*').pipe(size({title: 'build', gzip: true}));
	gulp.src(['dist/**/*']).pipe(gulp.dest('build/dist'));
	gulp.src('vendor/**/*').pipe(gulp.dest('build/vendor'));
	gulp.src('lib/**/*').pipe(gulp.dest('build/lib'));
	gulp.src('./*.{png,gif,jpg,php,css}').pipe(gulp.dest('build'));
});

gulp.task('zip', ['build'], () => {
	return gulp.src('build/**/*')
		 .pipe(zip('template.zip'))
		 .pipe(gulp.dest('./'));
});

//
// Watch
//
gulp.task('watch', ['js', 'sass', 'twig', 'images'],function () {
  gulp.watch('./src/scripts/**/*.js', ['js']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/views/**/*', ['twig']);
  gulp.watch('./src/images/**/*.{png,svg,jpg,gif}', ['images']);

	livereload.listen();
	util.log('Live reload server starting.');

	gulp.watch('**/*.php').on('change', livereload.changed);
	gulp.watch('dist/views/**').on('change', livereload.changed);
	gulp.watch('dist/css/*.css').on('change', livereload.changed);
	gulp.watch('dist/js/*.js').on('change', livereload.changed);
	gulp.watch('dist/images/**').on('change', livereload.changed);
});

gulp.task('default', ['watch']);
