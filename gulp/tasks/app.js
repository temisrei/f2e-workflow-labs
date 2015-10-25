var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

var config = require('../config');


// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');

// var minifyHTML = require('gulp-minify-html');
// var minifyCSS = require('gulp-minify-css');

// var less = require('gulp-less');

// var sourcemaps = require('gulp-sourcemaps');


gulp.task('watch', function(){
	gulp.watch('app/**/*.js', ['app']);
});

gulp.task('output-app', ['clean-app'], function(){
	gulp.src('app/**/*.js')
		.pipe(gulp.dest('output-app'));
});

gulp.task('clean-app', function(cb){
	del(['output-app/**', '!output-app']).then(function (paths) {
	    console.log('Deleted files/folders:\n', paths.join('\n'));
	    cb();
	});
});

gulp.task('app', function(){
	gulp.src([
			'app/**/*.module.js',
			'app/**/*.js'
		])
		.pipe($.sourcemaps.init())
			.pipe($.concat('app.js'))
			.pipe(gulp.dest(config.assetsDir + ''))
			.pipe($.uglify(config.uglifyOptions))
			.pipe($.rename({
				extname: '.min.js'
			}))
		.pipe($.sourcemaps.write('./'))

		.pipe(gulp.dest(config.assetsDir + ''));

	gulp.src('index.html')
		.pipe($.minifyHtml())
		.pipe($.rename({
			extname: '.min.html'
		}))
		.pipe(gulp.dest('./'))

	gulp.src(config.assetsDir + '/styles.css')
    	.pipe($.minifyCss(config.cssOptions))
    	.pipe($.rename({
    		extname: '.min.css'
    	}))
    	.pipe(gulp.dest(config.assetsDir + ''));

	gulp.src(config.assetsDir + '/styles.less')
		.pipe($.less())
		.pipe(gulp.dest('less_to_css/'))
    	.pipe($.minifyCss(config.cssOptions))
    	.pipe($.rename({
    		extname: '.min.css'
    	}))
    	.pipe(gulp.dest('less_to_css/'));
});