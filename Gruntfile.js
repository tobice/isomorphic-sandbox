module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                aliasMappings: [{
                    cwd: 'app/views',
                        src: ['**/*.jsx'],
                        dest: 'app/views'
                }]
            },
            debug: {
                options: {
                    debug: true,
                    transform: ['reactify']
                },
                files: {
                    'public/scripts.js': 'client.js'
                }
            },
            build: {
                options: {
                    debug: false,
                    transform: [
                        'reactify',
                        ['uglifyify', {
                            global: true,
                            ignore: ['**/app/controller.js']
                        }]]
                },
                files: {
                    'public/scripts.js': 'client.js'
                }
            }
        },

        less: {
            options: {
                paths: ['node_modules', 'node_modules/bootstrap/less']
            },
            debug: {
                files: {
                    'public/styles.css': 'assets/stylesheets/index.less'
                }
            },
            build: {
                options: {
                    cleancss: true
                },
                files: {
                    'public/styles.css': 'assets/stylesheets/index.less'
                }
            }
        },

        copy: {
            all: {
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
                tasks: ['browserify:debug'],
                options: {
                    interrupt: true
                }
            },
            styles: {
                files: 'assets/stylesheets/**/*',
                tasks: ['less:debug'],
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

    grunt.registerTask('server', ['browserify:debug', 'less:debug', 'copy', 'concurrent']);
    grunt.registerTask('build', ['browserify:build', 'less:build', 'copy']);
};
