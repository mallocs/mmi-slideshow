'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
    clean: {
      dist: ['dist'],
      build: ['build']
    },
    copy: {
      main: {
        files: [
          // includes files within path
          { 
             expand: true, 
             src: ['fonts/*'], 
             dest: 'dist/fonts/'}
        ],
      },
    },
    concat: {
      options: {
        banner: '<%= banner %>',
      },
      jquery: {
        src: ['bower_components/jquery/dist/jquery.js',
              'bower_components/jquery-ui/ui/core.js',
              'bower_components/jquery-ui/ui/widget.js',
              'bower_components/jquery-ui/ui/effect.js',
              'bower_components/jquery-ui/ui/effect-*.js'],
        dest: 'build/jquery.custom.js'
      },
      jsDist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      },
      jsDistWithJQuery: {
        src: ['build/jquery.custom.js', 'src/<%= pkg.name %>.js'],
        dest: 'dist/js/<%= pkg.name %>.bundle.js'
      },
      cssDist: {
        src: ['src/<%= pkg.name %>.css'],
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'src/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
      },
      dist: {
        src: '<%= concat.jsDist.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      distWithJQuery: {
        src: '<%= concat.jsDistWithJQuery.dest %>',
        dest: 'dist/js/<%= pkg.name %>.bundle.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          debug: true
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'connect', 'qunit', 'clean:dist',
'cssmin', 'concat', 'uglify', 'copy', 'clean:build']);
  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('build', ['jshint', 'cssmin', 'concat', 'uglify', 'copy']); //, 'clean:build']);
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
};
