module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      scripts: {
        files: ["**/*.coffee", "app.coffee"],
        tasks: ["coffee:compileBare"]
      },
      options: {
        interrupt: true
      }
    },
    coffee: {
      compileBare: {
        options: {
          bare: true
        },
        files: {
          "app.js": ["app.coffee"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  // grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-coffee");

  grunt.registerTask("dev", ["watch:scripts"]);
};
