module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      dev: {
        files: ['Gruntfile.js', 'assets/js/**/*.js', 'assets/css/**/*.css'],
        tasks: ['bower', 'injector:dev']
      },
      prod: {
        files: ['Gruntfile.js', 'assets/js/**/*.js', 'assets/css/**/*.css'],
        tasks: ['bower', 'uglify', 'cssmin', 'injector:prod']
      }
    },
    injector: {
      dev: {
        options: {
          addRootSlash: false,
          ignorePath: ['assets/js/min/script.js', 'assets/css/min/style.css'],
        },
        files: {
          'index.html': [
            'assets/js/dependencies/angular.js',
            'assets/js/dependencies/**/*.js',
            'assets/js/**/*.js',
            'assets/css/**/*.css'
            ],
        }
      },
      prod: {
        options: {
          addRootSlash: false,
        },
        files: {
          'index.html': ['assets/js/min/script.js', 'assets/css/min/style.css'],
        }
      }
    },
    bower: {
      dev: {
        dest: 'assets/',
        js_dest: 'assets/js/dependencies',
        css_dest: 'assets/css/dependencies'
      }
    },
    uglify: {
      prod: {
        options: {
          mangle: false
        },
        files: {
          'assets/js/min/script.js': [
          'assets/js/dependencies/angular.js',
          'assets/js/dependencies/**/*.js',
          'assets/js/**/*.js',
          '!assets/js/min/script.js',
          ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'assets/css/min/style.css': ['assets/css/**/*.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch:dev']);
  grunt.registerTask('dev', ['bower', 'injector:dev']);
  grunt.registerTask('prod', ['bower', 'uglify', 'cssmin', 'injector:prod']);
};
