'use strict';

var path = require('path'),
  exec = require('child_process').exec;

module.exports = function(grunt) {
  grunt.registerMultiTask('kss', 'Generate style guide with KSS.', function() {

    var done = this.async(),
      kssCmd = ['node'],
      realPath = path.dirname(__filename).replace(/tasks$/g, '');

    var opts = this.options({
      template: null,
      includeType: null,
      includePath: null,
      mask: null
    });

    kssCmd.push(realPath + 'node_modules/kss/bin/kss-node');

    this.files.forEach(function(file) {
      kssCmd.push(file.src[0]);
      kssCmd.push(file.dest);
    });

    if (opts.template !== null) {
      kssCmd.push('--template', opts.template);
    }

    if (opts.mask !== null) {
      kssCmd.push('--mask', opts.mask);
    }

    if (opts.includeType !== null && opts.includePath !== null) {
      kssCmd.push('--' + opts.includeType, opts.includePath);
    }

    var putInfo = function(error, result, code) {
      if (error !== null) {
        grunt.log.error(error);
        grunt.log.error('Code: ' + code);
      } else {
        grunt.log.write(result);
      }
      done();
    };

    // Execute!!
    exec(kssCmd.join(' '), putInfo);
    grunt.verbose.ok('`[KSS] ' + kssCmd.join(' ') + '` was initiated.');
  });
};
