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
            },
            create_app: {
                command:'forceios create --apptype=hybrid_local --appname=SDKSample --companyid=com.mobileuielements --organization=MobileUIElements --outputdir=. --appid --callbackuri\n' +
                        'cp -r index.html elements dist dependencies SDKSample/www/.\n' + 
                        'sed -i.orig -n \'1h; 1!H; ${ g; s/<!-- START_MOCK:.*:END_MOCK -->//;p; }\' SDKSample/www/index.html\n' + 
                        'cd SDKSample\n' + 
                        'cordova platform add android\n' + 
                        'node plugins/com.salesforce/tools/postinstall-android.js 19 true\n' +
                        'cordova build &\n' + 
                        'cd ..',
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

    grunt.registerTask('create_app', [
        'dist',
        'exec:create_app'
    ]);

    grunt.registerTask('default', ['build']);
};
