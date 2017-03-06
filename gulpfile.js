 // Just learning gulp. M.Garrison 2/1/2017.
  // The following are processed;
  // 1. html file is copied to dist dir.
  // 2. JavaScript files are concatenated and minified for production dist.
  // 3. sass/scss files are converted to css and placed in the css directory.
  // From the command line/shell enter ;
  // 1. 'gulp' - to build the dev distribution (dist/dev)
  // - See below gulp.task('default')
  // - files are watched and dist/dev is rebuilt.
  // 2. 'gulp build' - to build the production distribution (dist/prod)
  // - See below gulp.task('build')
  
var gulp    = require('gulp');
var concat  = require("gulp-concat");
var rename  = require("gulp-rename");
var sass    = require("gulp-sass");
var uglify  = require("gulp-uglify");
var del     = require('del');
var watch   = require('gulp-watch');

var config = { 
 	jsConcatFiles: [ 
 		'./app/js/module1.js',  
 		'./app/js/main.js' 
 	],  
 	buildFilesFoldersRemove:[ 
 		'dist/prod/scss/',  
 		'dist/prod/js/!(*.min.js)'
	] 
 };

// ////////////////////////////////////////////////
// For JavaScript Tasks - 
// ///////////////////////////////////////////////
gulp.task('scripts', function () {
  console.log("Processing script files ...")
  return gulp.src("app/**/*.js")
    .pipe(concat("app.js"))
    // not actually minifying the dev distribution - easier to read.
    .pipe(rename({suffix : ".min" }))
    .pipe(gulp.dest("dist/dev/js"))
});


// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////
gulp.task('styles', function() {
  console.log("Processing stylesheet files ...")
	return gulp.src(['app/scss/*.sass', 'app/scss/*.scss'])
		.pipe(sass({outputStyle: 'expanded'}))//nested,compact,compressed,expanded
		.pipe(gulp.dest('dist/dev/css'));
});


gulp.task('htmls', function () {
  console.log("Processing html files ...")
  return gulp.src("app/**/*.html")
  .pipe(gulp.dest("dist/dev"));
});

//deletes contents of dist/dev folder
gulp.task('clean', function(cb) {
    console.log("Cleaning all dev dirs & files ...")
    return del(['dist/dev/**/*'], cb)
});


// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('build:cleanfolder', function (cb) {
  console.log("Clean out all files ...");
	return del(['dist/prod/**/*'], cb);
});

// task to create build directory of all files
gulp.task('build:copy', ['build:cleanfolder'], function() {// does not work
//gulp.task('build:copy', function() {
    console.log("Copying all files ...");
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('dist/prod/'));
});

gulp.task('build:scripts', function () {
  console.log("Processing script files ...")
  return gulp.src("app/**/*.js")
  .pipe(concat("app.js"))
  .pipe(rename({suffix : ".min" }))
  .pipe(uglify())
  .pipe(gulp.dest("./dist/prod/js"))
});

gulp.task('build:styles', function() {
  console.log("Processing stylesheet files ...")
	return gulp.src(['app/scss/*.sass', 'app/scss/*.scss'])
		.pipe(sass({outputStyle: 'compressed'}))//nested,compact,compressed,expanded
    .pipe(gulp.dest('dist/prod/css'));
});

// task to removed unwanted build files
// list all files and directories here that you don't want included
gulp.task('build:remove', ['build:copy','build:scripts','build:styles'], function (cb) {
  console.log("Removing specific files ...");
	return del(config.buildFilesFoldersRemove, cb);
});

gulp.task('build', ['build:copy', 'build:remove']);// builds dist/prod dir.


gulp.task('watch', function() {// this works 2/2/2017 MG
  gulp.watch("app/**/*.js", ['build:dev']);
  gulp.watch("app/**/*.sass", ['build:dev']);
  gulp.watch("app/**/*.html", ['build:dev']);
    // Endless stream mode for development mode.
  console.log("watching for changes ...")
});


gulp.task('build:dev', ['clean', 'scripts', 'styles', 'htmls'], function() {
  console.log("build gulp project for dist/dev is completed.");
});


gulp.task('default', ['build:dev', 'watch']);
