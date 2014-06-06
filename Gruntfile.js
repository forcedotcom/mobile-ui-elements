'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);

    grunt.initConfig({
        clean: ['dist/*'],
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
              command: 'node node_modules/polymer-shim-styles/shim-styles.js dependencies/ratchet/dist/css/ratchet.css dependencies/ratchet/dist/css/ratchet.shim.css\n' +
                        'node node_modules/polymer-shim-styles/shim-styles.js elements/css/styles.css elements/css/styles.shim.css\n' +
                        'node node_modules/polymer-shim-styles/shim-styles.js elements/css/responsive.css elements/css/responsive.shim.css\n',
              stdout: true,
              stderr: true
            }
        },
        vulcanize: {
            default: {
                options: {
                    csp: true
                },
                files: {
                  'dist/mobile-ui-elements.html': 'elements/mobile-ui-elements.html'
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'exec:shim_styles'
    ]);

    grunt.registerTask('dist', [
        'build',
        'vulcanize',
        'uglify:dist'
    ]);

    grunt.registerTask('default', ['build']);
};
