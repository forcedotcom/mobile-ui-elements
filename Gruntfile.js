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
            shim_styles: {
              command: 'node node_modules/polymer-shim-styles/shim-styles.js dependencies/ratchet/ratchet.css dependencies/ratchet/ratchet.shim.css\n' +
                        'node node_modules/polymer-shim-styles/shim-styles.js elements/css/styles.css elements/css/styles.shim.css\n' +
                        'node node_modules/polymer-shim-styles/shim-styles.js elements/css/responsive.css elements/css/responsive.shim.css\n',
              stdout: true,
              stderr: true
            },
            vulcan: {
              command: 'node tools/vulcanize/vulcanize --csp elements/mobile-ui-elements.html -o dist/mobile-ui-elements.html',
              stdout: true,
              stderr: true
            }
        },
    });

    grunt.registerTask('build', [
        'clean',
        'bower',
        'exec:shim_styles'
    ]);

    grunt.registerTask('dist', [
        'build',
        'exec:vulcan',
        'uglify:dist'
    ]);

    grunt.registerTask('default', ['build']);
};
