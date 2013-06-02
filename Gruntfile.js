'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    data: 'data',
    app: 'app',
    temp: '.temp',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
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
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.temp %>/*',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        '-W117': true,
        '-W098': true, // <var> is defined but never used
        '-W083': true, // Don't make functions within a loop.
        '-W068': true // Wrapping non-IIFE function literals in parens is unnecessary.
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    yaml: {
      dist: {
        options: {
          ignored: /^_/,
          space: 2,
          constructors: {
            '!include': function (node, yaml) {
              var data = require('fs').readFileSync(node.value, 'utf-8');
              return yaml.load(data);
            }
          }
        },
        files: [
          {expand: true, cwd: '<%= yeoman.data %>', src: ['**/*.yaml'], dest: '<%= yeoman.data %>'}
        ]
      }
    },
    useminPrepare: {
      html: '<%= yeoman.temp %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.temp %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        },
        {
          expand: true,
          cwd: '<%= yeoman.temp %>/img',
          src: ['{,*/}*.{png,jpg,jpeg}', '!img/logo.png'],
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.temp %>/css/{,*/}*.css',
            '<%= yeoman.temp %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.temp %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.temp %>/scripts/{,*/}*.js',
          ]
        //},
        // {
        //   expand: true,
        //   cwd: '<%= yeoman.app %>',
        //   src: '/scripts/config_of.xchg.com.js',
        //   dest: '<%= yeoman.dist %>',
        //   rename: function(dest, src) {
        //     return dest + '/scripts/config.js';
        //   }
        }]
      }
    },
    copy: {
      temp: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.temp %>',
          src: [
            'scripts/**/*',
            '!scripts/config_of.xchg.com.js', // important
            '!scripts/config.js', // important
            '*.{ico,txt,js,html}',
            '.htaccess',
            'data/**/*',
            'components/**/*',
            'views/**/*',
            'css/**/*',
            'images/**/*.{png,jpg,jpeg,gif.ico,svg}',
            'fonts/**/*.{ttf}',
            'img/**/*.{png,jpg,jpeg,gif.ico,svg}'
          ]
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: 'scripts/config_of.xchg.com.js',
          dest: '<%= yeoman.temp %>',
          rename: function(dest, src) {
            return dest + '/scripts/config.js';
          }
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.temp %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'components/**/*',
            '*.{ico,txt,js,html}'
          ]
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: ['*.js'],
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/css/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif.ico}',
            '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif.ico}',
            '<%= yeoman.dist %>/fonts/*.{ttf}',
            '!<%= yeoman.dist %>/img/logo.png'
          ]
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css',
        '<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('doyaml', [
    'yaml:dist'
  ]);

  grunt.registerTask('server', [
    'clean:server',
    'yaml:dist',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    // 'test',
    'yaml:dist',
    'copy:temp',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy:dist',
    'cdnify',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
