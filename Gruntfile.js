// Generated by CoffeeScript 1.6.2
(function() {
  'use strict';
  var lrSnippet, mountFolder;

  lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

  mountFolder = function(connect, dir) {
    return connect["static"](require('path').resolve(dir));
  };

  module.exports = function(grunt) {
    var yeomanConfig;

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    yeomanConfig = {
      data: 'data',
      app: 'app',
      dist: 'dist'
    };
    try {
      yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
    } catch (_error) {}
    grunt.initConfig({
      yeoman: yeomanConfig,
      watch: {
        livereload: {
          files: ['<%= yeoman.app %>/{,*/}*.html', '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css', '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css', '{.tmp,<%= yeoman.app %>}/{,*/}*.js', '{.tmp,<%= yeoman.app %>}/{,*/}*.coffee', '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}', '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}', 'Gruntfile.coffee'],
          tasks: ['livereload']
        }
      },
      connect: {
        options: {
          port: 9000,
          hostname: 'localhost'
        },
        livereload: {
          options: {
            middleware: function(connect) {
              return [lrSnippet, mountFolder(connect, '.tmp'), mountFolder(connect, yeomanConfig.app)];
            }
          }
        },
        test: {
          options: {
            middleware: function(connect) {
              return [mountFolder(connect, '.tmp'), mountFolder(connect, 'test')];
            }
          }
        }
      },
      open: {
        server: {
          url: 'http://localhost:<%= connect.options.port %>'
        }
      },
      clean: {
        dist: {
          files: [
            {
              dot: true,
              src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*']
            }
          ]
        },
        server: '.tmp'
      },
      coffeelint: {
        app: ['<%= yeoman.app %>/{,*/}*.coffee', '<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        options: {
          no_trailing_whitespace: {
            level: 'error'
          },
          max_line_length: {
            value: 100,
            level: 'warn'
          },
          indentation: {
            value: 4,
            level: 'error'
          }
        },
        tests: {
          files: {
            src: ['tests/*.coffee']
          },
          options: {
            no_trailing_whitespace: {
              level: 'error'
            }
          }
        }
      },
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          laxcomma: true,
          '-W117': true,
          '-W065': true,
          '-W098': true,
          '-W116': true,
          '-W083': true,
          '-W040': true,
          '-W068': true
        },
        all: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js']
      },
      karma: {
        unit: {
          configFile: 'karma.conf.js',
          singleRun: true
        }
      },
      concat: {
        dist: {
          files: {
            '<%= yeoman.dist %>/scripts/scripts.js': ['.tmp/scripts/{,*/}*.js', '<%= yeoman.app %>/scripts/{,*/}*.js']
          }
        }
      },
      useminPrepare: {
        html: '<%= yeoman.app %>/index.html',
        options: {
          dest: '<%= yeoman.dist %>'
        }
      },
      usemin: {
        html: ['<%= yeoman.dist %>/{,*/}*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/css/{,*/}*.css'],
        options: {
          dirs: ['<%= yeoman.dist %>']
        }
      },
      imagemin: {
        dist: {
          files: [
            {
              expand: true,
              cwd: '<%= yeoman.app %>/images',
              src: '{,*/}*.{png,jpg,jpeg}',
              dest: '<%= yeoman.dist %>/images'
            }, {
              expand: true,
              cwd: '<%= yeoman.app %>/img',
              src: '{,*/}*.{png,jpg,jpeg}',
              dest: '<%= yeoman.dist %>/img'
            }
          ]
        }
      },
      cssmin: {
        dist: {
          files: {
            '<%= yeoman.dist %>/styles/main.css': ['.tmp/styles/{,*/}*.css', '<%= yeoman.app %>/css/{,*/}*.css', '<%= yeoman.app %>/styles/{,*/}*.css']
          }
        }
      },
      htmlmin: {
        dist: {
          options: {},
          files: [
            {
              expand: true,
              cwd: '<%= yeoman.app %>',
              src: ['*.html', 'views/**/*.html'],
              dest: '<%= yeoman.dist %>'
            }
          ]
        }
      },
      cdnify: {
        dist: {
          html: ['<%= yeoman.dist %>/*.html']
        }
      },
      ngmin: {
        dist: {
          files: [
            {
              expand: true,
              cwd: '<%= yeoman.dist %>/scripts',
              src: '*.js',
              dest: '<%= yeoman.dist %>/scripts'
            }
          ]
        }
      },
      uglify: {
        dist: {
          files: {
            '<%= yeoman.dist %>/scripts/scripts.js': ['<%= yeoman.dist %>/scripts/scripts.js']
          }
        }
      },
      rev: {
        dist: {
          files: {
            src: ['<%= yeoman.dist %>/scripts/{,*/}*.js', '<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/css/{,*/}*.css', '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif.ico}', '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif.ico}', '<%= yeoman.dist %>/fonts/*.{ttf}']
          }
        }
      },
      copy: {
        dist: {
          files: [
            {
              expand: true,
              dot: true,
              cwd: '<%= yeoman.app %>',
              dest: '<%= yeoman.dist %>',
              src: ['app.js', '*.{ico,txt}', '.htaccess', 'components/**/*', 'css/**/*', 'images/**/*.{png,jpg,jpeg,gif,ico,svg}', 'fonts/**/*.{ttf}', 'img/**/*.{png,jpg,jpeg,gif,ico,svg}']
            }, {
              expand: true,
              dot: true,
              cwd: '<%= yeoman.data %>',
              dest: '<%= yeoman.dist %>/data',
              src: ['**/*.json']
            }
          ]
        }
      },
      yaml: {
        dist: {
          options: {
            ignored: /^_/,
            space: 2,
            constructors: {
              '!include': function(node, yaml) {
                var data;

                data = require('fs').readFileSync(node.value, 'utf-8');
                return yaml.load(data);
              }
            }
          },
          files: [
            {
              expand: true,
              cwd: '<%= yeoman.data %>',
              src: ['**/*.yaml'],
              dest: '<%= yeoman.data %>'
            }
          ]
        }
      }
    });
    grunt.renameTask('regarde', 'watch');
    grunt.registerTask('doyaml', ['yaml:dist']);
    grunt.registerTask('server', ['clean:server', 'livereload-start', 'connect:livereload', 'open', 'watch']);
    grunt.registerTask('test', ['clean:server', 'connect:test', 'karma']);
    grunt.registerTask('build', ['clean:dist', 'coffeelint', 'useminPrepare', 'imagemin', 'cssmin', 'htmlmin', 'concat', 'copy', 'cdnify', 'ngmin', 'uglify', 'rev', 'usemin']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('cslint', ['coffeelint']);
    return grunt.registerTask('default', ['build']);
  };

}).call(this);
