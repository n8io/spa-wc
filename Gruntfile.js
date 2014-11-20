module.exports = function(grunt) {
  var jadeWatchFileArr = [
    './views/html/resources/**/*.jade'
  ];

  var stylusWatchFileArr = [
    './css/*.styl'
  ];

  var stylusSrcFileArr = [
    './css/style.styl'
  ];

  var cssSrcFileArr = [
    './dist/css/style.min.css'
  ];

  var jsWatchFileArr = [
    './js/ng/**/*.js',
    './js/*.js'
  ];

  var jsSrcFileArr = [
    './js/ng/app.js',
    './js/ng/controllers.js',
    './js/ng/directives.js',
    './js/ng/services.js',
    './js/script.js'
  ];

  var staticsWatchFileArr = [
    './statics/**/*'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      clean: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '.' //Up to proj root
          }
        },
        command: ['rm -rf ./dist','rm -rf ./tmp'].join(' && ')
      }
    },
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: './statics',
            src: '**',
            dest: 'dist',
            flatten: false
          }
        ]
      }
    },
    jshint: {
      all: {
        src: ['./js/**/*.js'],
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      options : {
        mangle: true,
        compress: true,
        banner : '/* Minified via UglifyJs ' + (new Date()).toString() + ' */\n'
      },
      files: {
        './dist/js/script.min.js': jsSrcFileArr
      }
    },
    stylus: {
      options: {
        paths: ['./css'],
        import: ['nib'], // use stylus plugin at compile time
        linenos: false,
        compress: true
      },
      files: {
        './dist/css/style.min.css': stylusSrcFileArr
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: './src/views/html',
            src: ['**/*.jade'],
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },
    cssmin: {
      options:{
        keepSpecialComments: 0,
        banner : '/* Minified via CssMin ' + (new Date()).toString() + ' */'
      },
      files: {
        './dist/css/style.min.css': cssSrcFileArr,
        './dist/css/vendor/prism/0.0.0/prism.min.css': './statics/css/vendor/prism/0.0.0/prism.css'
      }
    },
    watch: {
      scripts: {
        files: jsWatchFileArr,
        tasks: ['jshint', 'uglify'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      css: {
        files: stylusWatchFileArr,
        tasks: ['stylus'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      jade: {
        files: jadeWatchFileArr,
        tasks: ['jade'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      statics: {
        files: staticsWatchFileArr,
        tasks: ['copy:assets'],
        options: {
          nospawn: false,
          interrupt: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Environment agnostic
  grunt.registerTask('preinit', [
    'shell:logs',
    'shell:clean',
    'jade',
    'copy:assets'
  ]);

  grunt.registerTask('postinit', [
    'shell:cleanNg'
  ]);

  // Dev build (expanded css and js)
  grunt.registerTask('dev', [
    'preinit',
    'stylus:dev',
    'cssmin:dev',
    'jshint',
    'copy:js',
    'uglify:dev',
    'postinit'
  ]);

  // Alias for default task
  grunt.registerTask('prod', [
    'default'
  ]);

  // Dev watcher
  grunt.registerTask('watcher', 'Fires minify css and js, then watches for changes', [
    'dev',
    'concurrent'
  ]);

  // Default task(s).
  grunt.registerTask('default', [
    'preinit',
    'stylus:prod',
    'cssmin:prod',
    'uglify:prod',
    'uglify:prodNg',
    'postinit'
  ]);
};