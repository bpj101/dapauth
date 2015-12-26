'use strict';
module.exports = function (grunt) {
	grunt.registerTask('default', [
    'bower:install', //custom install bower files in assets/js/dependencies
    'compileAssets', 
    'linkAssets',  
    'watch'
  ]);
};
