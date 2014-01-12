'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);

    grunt.initConfig({
        clean: ['dist/*'],
        bower: {
            install: {
                options: {
                    targetDir: 'dependencies',
                    cleanTargetDir: true
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: 'dist/mobile-ui-elements.min.js.map'
                },
                files: {
                    'dist/mobile-ui-elements.min.js': ['dist/mobile-ui-elements.js']
                }
            }
        },
        exec: {
            vulcan: {
              command: 'node tools/vulcanize/vulcanize --csp elements/mobile-ui-elements.html -o dist/mobile-ui-elements.html',
              stdout: true,
              stderr: true
            }
        },
    });

    grunt.registerTask('build', [
        'clean',
        'bower'
    ]);

    grunt.registerTask('dist', [
        'build',
        'exec',
        'uglify:dist'
    ]);

    grunt.registerTask('default', ['build']);
};
