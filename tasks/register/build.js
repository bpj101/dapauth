'use strict';
module.exports = function (grunt) {
	grunt.registerTask('build', [
		'bower:install', //custom install bower files in assets/js/dependencies
    'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'copy:build'
	]);
};
