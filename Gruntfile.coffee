'use strict'
lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet
mountFolder = (connect, dir) ->
    connect.static require('path').resolve(dir)

module.exports = (grunt) ->

    # load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

    # configurable paths
    yeomanConfig =
        data: 'data'
        app: 'app'
        dist: 'dist'

    try
        yeomanConfig.app = require('./component.json').appPath or yeomanConfig.app
    grunt.initConfig
        yeoman: yeomanConfig
        watch:
            livereload:
                files: ['<%= yeoman.app %>/{,*/}*.html', '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css', '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css', '{.tmp,<%= yeoman.app %>}/{,*/}*.js', '{.tmp,<%= yeoman.app %>}/{,*/}*.coffee', '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}', '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}', 'Gruntfile.coffee']
#                tasks: ['dojade', 'livereload']
                tasks: ['livereload']


        connect:
            options:
                port: 9000

            # Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'

            livereload:
                options:
                    middleware: (connect) ->
                        [lrSnippet, mountFolder(connect, '.tmp'), mountFolder(connect, yeomanConfig.app)]

            test:
                options:
                    middleware: (connect) ->
                        [mountFolder(connect, '.tmp'), mountFolder(connect, 'test')]

        open:
            server:
                url: 'http://localhost:<%= connect.options.port %>'

        clean:
            dist:
                files: [
                    dot: true
                    src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*']
                ]

            server: '.tmp'
#
#        jade:
#            no_options:
#                files:
#                    '<%= yeoman.app %>/': ['<%= yeoman.app %>/*.jade']

        coffeelint:
            app: ['<%= yeoman.app %>/{,*/}*.coffee', '<%= yeoman.app %>/scripts/{,*/}*.coffee']
            options:
                no_trailing_whitespace:
                    level: 'error'

                max_line_length:
                    value: 100
                    level: 'warn'

                indentation:
                    value: 4
                    level: 'error'

            tests:
                files:
                    src: ['tests/*.coffee']

                options:
                    no_trailing_whitespace:
                        level: 'error'

        jshint:
            options:
                jshintrc: '.jshintrc'
                laxcomma: true
                '-W117': true
                '-W065': true # Missing radix parameter.
                '-W098': true # <var> is defined but never used
                '-W116': true # Expected '!==' and instead saw '!='.
                '-W083': true # Don't make functions within a loop.
                '-W040': true # Possible strict violation. Don't like this but don't understand this complaint: (typeof exports === 'undefined' ? this['routingConfig'] = {} : exports)
                '-W068': true # Wrapping non-IIFE function literals in parens is unnecessary.

            all: ['Gruntfile.js', '<%= yeoman.app %>/scripts/{,*/}*.js']

        karma:
            unit:
                configFile: 'karma.conf.js'
                singleRun: true

        concat:
            dist:
                files:
                    '<%= yeoman.dist %>/scripts/scripts.js': ['.tmp/scripts/{,*/}*.js', '<%= yeoman.app %>/scripts/{,*/}*.js']

        useminPrepare:
            html: '<%= yeoman.app %>/index.html'
            options:
                dest: '<%= yeoman.dist %>'

        usemin:
            html: ['<%= yeoman.dist %>/{,*/}*.html']
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/css/{,*/}*.css']
            options:
                dirs: ['<%= yeoman.dist %>']

        imagemin:
            dist:
                files: [
                    expand: true
                    cwd: '<%= yeoman.app %>/images'
                    src: '{,*/}*.{png,jpg,jpeg}'
                    dest: '<%= yeoman.dist %>/images'
                ,
                    expand: true
                    cwd: '<%= yeoman.app %>/img'
                    src: '{,*/}*.{png,jpg,jpeg}'
                    dest: '<%= yeoman.dist %>/img'
                ]

        cssmin:
            dist:
                files:
                    '<%= yeoman.dist %>/styles/main.css': ['.tmp/styles/{,*/}*.css', '<%= yeoman.app %>/css/{,*/}*.css', '<%= yeoman.app %>/styles/{,*/}*.css']

        htmlmin:
            dist:
                options: {}

            #removeCommentsFromCDATA: true,
            #          // https://github.com/yeoman/grunt-usemin/issues/44
            #          //collapseWhitespace: true,
            #          collapseBooleanAttributes: true,
            #          removeAttributeQuotes: true,
            #          removeRedundantAttributes: true,
            #          useShortDoctype: true,
            #          removeEmptyAttributes: true,
            #          removeOptionalTags: true
                files: [
                    expand: true
                    cwd: '<%= yeoman.app %>'
                    src: ['*.html', 'views/**/*.html']
                    dest: '<%= yeoman.dist %>'
                ]

        cdnify:
            dist:
                html: ['<%= yeoman.dist %>/*.html']

        ngmin:
            dist:
                files: [
                    expand: true
                    cwd: '<%= yeoman.dist %>/scripts'
                    src: '*.js'
                    dest: '<%= yeoman.dist %>/scripts'
                ]

        uglify:
            dist:
                files:
                    '<%= yeoman.dist %>/scripts/scripts.js': ['<%= yeoman.dist %>/scripts/scripts.js']

        rev:
            dist:
                files:
                    src: ['<%= yeoman.dist %>/scripts/{,*/}*.js', '<%= yeoman.dist %>/styles/{,*/}*.css', '<%= yeoman.dist %>/css/{,*/}*.css', '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif.ico}', '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif.ico}', '<%= yeoman.dist %>/fonts/*.{ttf}']

        copy:
            dist:
                files: [
                    expand: true
                    dot: true
                    cwd: '<%= yeoman.app %>'
                    dest: '<%= yeoman.dist %>'
                    src: ['app.js', '*.{ico,txt}', '.htaccess', 'components/**/*', 'css/**/*', 'images/**/*.{png,jpg,jpeg,gif,ico,svg}', 'fonts/**/*.{ttf}', 'img/**/*.{png,jpg,jpeg,gif,ico,svg}']
                ,
                    expand: true
                    dot: true
                    cwd: '<%= yeoman.data %>'
                    dest: '<%= yeoman.dist %>/data'
                    src: ['**/*.json']
                ]

        yaml:
            dist:
                options:
                    ignored: /^_/
                    space: 2
                    constructors:
                        '!include': (node, yaml) ->
                            data = require('fs').readFileSync(node.value, 'utf-8')
                            yaml.load data

                files: [
                    expand: true
                    cwd: '<%= yeoman.data %>'
                    src: ['**/*.yaml']
                    dest: '<%= yeoman.data %>'
                ]

    grunt.renameTask 'regarde', 'watch'
    grunt.registerTask 'doyaml', ['yaml:dist']
#    grunt.registerTask 'dojade', ['dojade:no_options']
#    grunt.registerTask 'server', ['clean:server', 'yaml:dist', 'livereload-start', 'connect:livereload', 'open', 'watch']
    grunt.registerTask 'server', ['clean:server', 'livereload-start', 'connect:livereload', 'open', 'watch']
    grunt.registerTask 'test', ['clean:server', 'connect:test', 'karma']


    # 'jshint',

    # 'test',
#    grunt.registerTask 'build', ['clean:dist', 'coffeelint', 'yaml:dist', 'useminPrepare', 'imagemin', 'cssmin', 'htmlmin', 'concat', 'copy', 'cdnify', 'ngmin', 'uglify', 'rev', 'usemin']
    grunt.registerTask 'build', ['clean:dist', 'coffeelint', 'useminPrepare', 'imagemin', 'cssmin', 'htmlmin', 'concat', 'copy', 'cdnify', 'ngmin', 'uglify', 'rev', 'usemin']

    # 'htmllint',
    grunt.registerTask 'lint', ['jshint']

    # 'htmllint',
    grunt.registerTask 'cslint', ['coffeelint']
    grunt.registerTask 'default', ['build']
