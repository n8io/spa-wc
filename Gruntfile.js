var moment = require('moment');
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var timestampMs = (new Date()).getTime();
  var timestamp = moment().format('ddd ll HH:mmZZ') + ' [ ' + timestampMs + ' ]';

  var setup = {
    jadeSrcFileArr: [
      '**/*.jade'
    ],
    jadeWatchFileArr: [
      './src/server/views/**/*.jade'
    ],
    polymerSrcFileArr: [
      './src/client/polymer-elements/*.html'
    ],
    stylusWatchFileArr: [
      './src/server/css/**/*.styl'
    ],
    stylusSrcFileArr: [
      './src/server/css/style.styl'
    ],
    cssSrcFileArr: [
      './src/client/css/style.min.css'
    ],
    jsWatchFileArr: [
      './src/server/js/**/*.js'
    ],
    jsNgSrcFileArr: [
      './src/server/js/ng/app.js',
      './src/server/js/ng/constants.js',
      './src/server/js/ng/values.js',
      './src/server/js/ng/config.js',
      './src/server/js/ng/filters.js',
      './src/server/js/ng/services.js',
      './src/server/js/ng/factories.js',
      './src/server/js/ng/controllers.js',
      './src/server/js/ng/directives.js',
    ],
    jsSrcFileArr: [
      './src/server/js/script.js'
    ],
    staticsWatchFileArr: [
      './src/server/statics/**/*'
    ]
  };

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
        command: ['rm -rf ./src/client','rm -rf ./tmp'].join(' && ')
      },
      cleanNg: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '.' //Up to proj root
          }
        },
        command: [
          'mv src/client/js/ng/ng.min.js src/client/js/ng.min.js',
          'rm -rf src/client/js/ng/*.js',
          'rm -rf src/client/ng',
          'mv src/client/js/ng.min.js src/client/js/ng/ng.min.js'
        ].join(' && ')
      },
      cleanPolymer: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '.' //Up to proj root
          }
        },
        command: [
          'mv src/client/polymer-elements/elements-csp.html src/client/elements-csp.html',
          'mv src/client/polymer-elements/elements-csp.js src/client/elements-csp.js',
          'rm -rf src/client/polymer-elements/*',
          'mv src/client/elements-csp.html src/client/polymer-elements/elements-csp.html',
          'mv src/client/elements-csp.js src/client/polymer-elements/elements-csp.js'
        ].join(' && ')
      }
    },
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/server/statics',
            src: '**',
            dest: 'src/client/statics',
            flatten: false
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: './src/server/js',
            src: '**',
            dest: './src/client/js',
            ext: '.min.js',
            flatten: false,
            filter: 'isFile'
          }
        ]
      }
    },
    jshint: {
      all: {
        src: ['./src/server/js/**/*.js'],
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
          './src/client/js/script.min.js': setup.jsSrcFileArr
        }
      },
      prod: {
        options : {
          mangle: true,
          compress: true,
          banner : '/* Minified via UglifyJs ' + timestamp + ' */\n'
        },
        files: {
          './src/client/js/script.min.js': setup.jsSrcFileArr
        }
      },
      devNg: {
        options : {
          mangle: false,
          compress: false,
          preserveComments: 'some',
          beautify: {
            beautify: true,
            indent_level: 2
          }
        },
        files: [{
          expand: true,
          cwd: './src/client/js/ng',
          src: ['**/*.js'],
          dest: './src/client/js/ng',
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
          './src/client/js/ng/ng.min.js': ['./src/client/js/ng/*.min.js']
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
          cwd: './src/client/js/ng',
          src: '**/*.js',
          dest: './src/client/js/ng',
          ext: '.min.js'
        }]
      },
      devPolymer: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'some',
          beautify: {
            beautify: true,
            indent_level: 2
          }
        },
        files: {
          './src/client/polymer-elements/elements-csp.js': './src/client/polymer-elements/elements-csp.js'
        }
      },
      prodPolymer: {
        options: {
          mangle: true,
          compress: true,
          banner : '/* Minified via UglifyJs ' + timestamp + ' */\n'
        },
        files: {
          './src/client/polymer-elements/elements-csp.js': './src/client/polymer-elements/elements-csp.js'
        }
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
          './src/client/css/style.min.css': setup.stylusSrcFileArr
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
          './src/client/css/style.min.css': setup.stylusSrcFileArr
        }
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true,
          data: {
            cacheKey: timestampMs,
            env: 'dev'
          }
        },
        files: [
          {
            expand: true,
            cwd: './src/server/views/html',
            src: setup.jadeSrcFileArr,
            dest: 'src/client/',
            ext: '.html'
          }
        ]
      },
      prod: {
        options: {
          pretty: false,
          data: { 
            cacheKey: timestampMs, 
            env: 'prod'
          }
        },
        files: [
          {
            expand: true,
            cwd: './src/server/views/html',
            src: setup.jadeSrcFileArr,
            dest: 'src/client/',
            ext: '.html'
          }
        ]
      }
    },
    vulcanize: {
      dev: {
        options: {
          csp:  true
        },
        files: {
          './src/client/polymer-elements/elements-csp.html': './src/client/polymer-elements/elements-csp.html'
        }
      }
    },
    cssmin: {
      prod: {
        options:{
          keepSpecialComments: 0,
          banner : '/* Minified via CssMin ' + timestamp + ' */'
        },
        files: {
          './src/client/css/style.min.css': setup.cssSrcFileArr
        }
      }
    },
    concat: {
      dev: {
        src: setup.jsNgSrcFileArr,
        dest: './src/client/js/ng/ng.min.js'
      },
      devPolymer: {
        src: setup.polymerSrcFileArr,
        dest: './src/client/polymer-elements/elements-csp.html'
      }
    },
    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: {
          './src/client/polymer-elements/elements-csp.html': './src/client/polymer-elements/elements-csp.html'
        }
      }
    },
    ngAnnotate: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './src/client/js/ng',
            src: '**/*.min.js',
            dest: './src/client/js/ng',
            ext: '.min.js'
          }
        ]
      }
    },
    ngtemplates: {
      app: {
        cwd: './src/client/ng/templates',
        src: '**/*.html',
        dest: './src/client/js/ng/ng.tmpl.min.js',
        options:    {
          url: function(url) { return url.replace('.html', ''); },
          bootstrap:  function(module, script) {
            var jsLines = script.split('\n');
            jsLines.shift(); //Pop off the extra 'use strict' line
            var lines = [
              '"use strict";',
              'angular',
              '  .module("' + module + '")',
              '  .run(preloadTemplates)',
              '  ;',
              '',
              'function preloadTemplates($log, $templateCache){',
              '  ' + jsLines.join('\n'),
              '}',
              'preloadTemplates.$inject = ["$log", "$templateCache"];',
            ];
              
            var js = lines.join('\n');
            return '(function(){\n  ' + js + '\n})();';
          },
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
      options: {
        livereload: true
      },
      scripts: {
        files: setup.jsWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      css: {
        files: setup.stylusWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      jade: {
        files: setup.jadeWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      statics: {
        files: setup.staticsWatchFileArr,
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
    'shell:cleanNg',
    'shell:cleanPolymer'
  ]);

  // Dev build
  grunt.registerTask('dev', [
    'preprocess',
    'jade:dev',
    'copy',
    'stylus:dev',
    'concat:dev',
    'concat:devPolymer',
    'vulcanize:dev',
    'jshint',
    'ngAnnotate',
    'ngtemplates',
    'uglify:devNg',
    'uglify:devPolymer',
    'postprocess'
  ]);

  // Alias for Prod build
  grunt.registerTask('prod', [
    'default'
  ]);

  // Dev watcher
  grunt.registerTask('watcher', 'Fires minify css and js, then watches for changes', [
    'dev',
    'watch'
  ]);

  // Prod build (default task)
  grunt.registerTask('default', [
    'preprocess',
    'jade:prod',
    'copy',
    'concat:devPolymer',
    'vulcanize:dev',
    'htmlmin:prod',
    'stylus:prod',
    'cssmin:prod',
    'ngAnnotate',
    'ngtemplates',
    'uglify:prod',
    'uglify:prodNg',
    'uglify:prodNgCommon',
    'uglify:prodPolymer',
    'postprocess'
  ]);
};