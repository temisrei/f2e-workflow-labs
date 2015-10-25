var $ = require('jquery');
var config = require('./gulp/config.js');

console.log('Hello world!! assets Path: ' + config.assetsDir);

$(function(){
	$('body').on('click', function(){
		require('./assets/styles.css');

		var picurl = require('./img_01.jpg');

		$('#pic').append('<img src="' + picurl + '">');
	})
});