var gulp = require('gulp');
var del = require('del');

var config = require('../config');


gulp.task('default', ['mytask1', 'mytask2'], function(){
	console.log('Hello default task');
});

gulp.task('mytask1', function(cb){
	console.log('Hello task1');
	cb();
});

gulp.task('mytask2', function(cb){
	console.log('Hello task2');
	cb();
});

gulp.task('output1', function(){
	// 先讀入檔案
	gulp.src(config.assetsDir + '/vendor/bootstrap/**/*.js') // ** 代表包含子目錄
		.pipe(gulp.dest('output1'));
});

gulp.task('output2', ['clean'], function(){
	gulp.src(config.assetsDir + '/vendor/bootstrap/**/*.js',
			{
				base: config.assetsDir + '/vendor/'
			})
		.pipe(gulp.dest('output2'));
});

gulp.task('output3', ['clean'], function(){
	gulp.src([
			config.assetsDir + '/vendor/**/*.js',
			config.assetsDir + '/vendor/**/*.css'
		])
		.pipe(gulp.dest('output3'));
})

gulp.task('clean', function(cb){
	del(['output3/**', '!output3']).then(function (paths) {
    	console.log('Deleted files/folders:\n', paths.join('\n'));
    	cb();
	});
});