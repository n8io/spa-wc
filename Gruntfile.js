var moment = require('moment');
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var timestamp = moment().format('ddd ll HH:mmZZ') + ' [ ' + moment().format('x') + ' ]';

  var jadeSrcFileArr = [
    '**/*.jade'
  ];

  var jadeWatchFileArr = [
    './src/views/html/**/*.jade'
  ];

  var stylusWatchFileArr = [
    './src/css/**/*.styl'
  ];

  var stylusSrcFileArr = [
    './src/css/_build.styl'
  ];

  var cssSrcFileArr = [
    './dist/css/style.min.css'
  ];

  var jsWatchFileArr = [
    './src/js/**/*.js'
  ];

  var jsNgSrcFileArr = [
    './src/js/ng/app.js',
    './src/js/ng/constants.js',
    './src/js/ng/values.js',
    './src/js/ng/config.js',
    './src/js/ng/filters.js',
    './src/js/ng/services.js',
    './src/js/ng/factories.js',
    './src/js/ng/controllers.js',
    './src/js/ng/directives.js',
  ];

  var jsSrcFileArr = [
    './src/js/script.js'
  ];

  var staticsWatchFileArr = [
    './src/statics/**/*'
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
      },
      cleanNg: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '.' //Up to proj root
          }
        },
        command: [
          'mv dist/js/ng/ng.min.js dist/js/ng.min.js',
          'rm -rf dist/js/ng/*.js',
          'rm -rf dist/ng',
          'mv dist/js/ng.min.js dist/js/ng/ng.min.js'
        ].join(' && ')
      }
    },
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: './src/statics',
            src: '**',
            dest: 'dist',
            flatten: false
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: './src/js',
            src: '**',
            dest: './dist/js',
            ext: '.min.js',
            flatten: false,
            filter: 'isFile'
          }
        ]
      }
    },
    jshint: {
      all: {
        src: ['./src/js/**/*.js'],
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      dev: {
        options : {
          mangle: false,
          compress: false,
          preserveComments: 'some',
          beautify: true
        },
        files: {
          './dist/js/script.min.js': jsSrcFileArr
        }
      },
      prod: {
        options : {
          mangle: true,
          compress: true,
          banner : '/* Minified via UglifyJs ' + timestamp + ' */\n'
        },
        files: {
          './dist/js/script.min.js': jsSrcFileArr
        }
      },
      devNg: {
        options : {
          mangle: false,
          compress: false,
          preserveComments: 'some',
          beautify: true
        },
        files: [{
          expand: true,
          cwd: './dist/js/ng',
          src: ['**/*.js'],
          dest: './dist/js/ng',
          ext: '.min.js'
        }]
      },
      prodNgCommon: {
        options : {
          mangle: true,
          compress: true,
          banner : '/* Minified via UglifyJs ' + timestamp + ' */\n'
        },
        files: {
          './dist/js/ng/ng.min.js': ['./dist/js/ng/*.min.js']
        }
      },
      prodNg: {
        options : {
          mangle: true,
          compress: true,
          banner : '/* Minified via UglifyJs ' + timestamp + ' */\n'
        },
        files: [{
          expand: true,
          cwd: './dist/js/ng',
          src: '**/*.js',
          dest: './dist/js/ng',
          ext: '.min.js'
        }]
      }
    },
    stylus: {
      dev: {
        options: {
          paths: ['./css'],
          import: ['nib'], // use stylus plugin at compile time
          linenos: true,
          compress: false
        },
        files: {
          './dist/css/style.min.css': stylusSrcFileArr
        }
      },
      prod: {
        options: {
          paths: ['./css'],
          import: ['nib'], // use stylus plugin at compile time
          linenos: false,
          compress: true,
          banner: '/* Minified via Stylus on ' + timestamp + '*/\n'
        },
        files: {
          './dist/css/style.min.css': stylusSrcFileArr
        }
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true,
          data: { cacheKey: (new Date()).getTime() }
        },
        files: [
          {
            expand: true,
            cwd: './src/views/html',
            src: jadeSrcFileArr,
            dest: 'dist/',
            ext: '.html'
          }
        ]
      },
      prod: {
        options: {
          pretty: false,
          data: { cacheKey: (new Date()).getTime() }
        },
        files: [
          {
            expand: true,
            cwd: './src/views/html',
            src: jadeSrcFileArr,
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },
    cssmin: {
      prod: {
        options:{
          keepSpecialComments: 0,
          banner : '/* Minified via CssMin ' + timestamp + ' */'
        },
        files: {
          './dist/css/style.min.css': cssSrcFileArr
        }
      }
    },
    concat: {
      dev: {
        src: jsNgSrcFileArr,
        dest: './dist/js/ng/ng.min.js'
      }
    },
    ngAnnotate: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './dist/js/ng',
            src: '**/*.min.js',
            dest: './dist/js/ng',
            ext: '.min.js'
          }
        ]
      }
    },
    ngtemplates: {
      app: {
        cwd: './dist/ng/partials',
        src: '**/*.html',
        dest: './dist/js/ng/ng.templates.min.js',
        options:    {
          htmlmin:  {
            collapseWhitespace:             true,
            removeComments:                 true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      }
    },
    watch: {
      scripts: {
        files: jsWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      css: {
        files: stylusWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      jade: {
        files: jadeWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      statics: {
        files: staticsWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      }
    }
  });

  // Environment agnostic
  grunt.registerTask('preprocess', [
    'shell:clean',
  ]);

  grunt.registerTask('postprocess', [
    'shell:cleanNg'
  ]);

  // Dev build (expanded css and js)
  grunt.registerTask('dev', [
    'preprocess',
    'jade:dev',
    'ngtemplates',
    'copy',
    'stylus:dev',
    'concat:dev',
    'jshint',
    'ngAnnotate',
    'uglify:devNg',
    'postprocess'
  ]);

  // Alias for default task
  grunt.registerTask('prod', [
    'default'
  ]);

  // Dev watcher
  grunt.registerTask('watcher', 'Fires minify css and js, then watches for changes', [
    'dev',
    'watch'
  ]);

  // Default task(s).
  grunt.registerTask('default', [
    'preprocess',
    'jade:prod',
    'ngtemplates',
    'copy',
    'stylus:prod',
    'cssmin:prod',
    'ngAnnotate',
    'uglify:prod',
    'uglify:prodNg',
    'uglify:prodNgCommon',
    'postprocess'
  ]);
};