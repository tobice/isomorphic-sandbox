module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            main: {
                options: {
                    debug: true,
                    transform: ['reactify'],
                    aliasMappings: [
                        {
                            cwd: 'app/views',
                            src: ['**/*.jsx'],
                            dest: 'app/views'
                        }
                    ],
                },
                files: {
                    'public/scripts.js': 'client.js',
                },
            },
        },

        less: {
            development: {
                options: {
                    paths: ['node_modules', 'node_modules/bootstrap/less']
                },
                files: {
                    'public/styles.css': 'assets/stylesheets/index.less'
                }
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/font-awesome/fonts/',
                    src: '**',
                    dest: 'public/fonts/'}]
            }
        },

        nodemon: {
            all: {
                script: 'server.js',
                options: {
                    ext: 'js,jsx',
                    ignore: ['node_modules/**', 'public/scripts.js'],
                    env: {
                        DEBUG: ''
                    }
                }
            }
        },

        watch: {
            app: {
                files: ['app/**/*', 'client.js'],
                tasks: ['browserify'],
                options: {
                    interrupt: true
                }
            },
            styles: {
                files: 'assets/stylesheets/**/*',
                tasks: ['less'],
                options: {
                    interrupt: true
                }
            }
        },

        concurrent: {
            main: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('compile', ['browserify', 'less', 'copy']);
    grunt.registerTask('default', ['compile']);
    grunt.registerTask('server', ['compile', 'concurrent']);
};
