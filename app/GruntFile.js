module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config_app.json'),
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },      
      target: {
        files: {
          '<%= config.paths.build.js %><%= pkg.name %>.min.js': ['<%= config.paths.src.js %>app.js', 
                                                            '<%= config.paths.src.js %>controller.js', 
                                                            '<%= config.paths.src.js %>directives.js']
        }
      }
    },
    watch: {
      files: ['<%= config.paths.src.js %>*.js'],
      tasks: ['build'],
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['build', 'watch']);

};