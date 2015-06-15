module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    bases: ["app", "bower_components"]
                }
            }
        },
        watch: {
            all: {
                files: ["app/*.js", "app/*.css", "app/*.html"],
                options: {
                    livereload: true
                }
            },
            js: {
                files: "app/*.js",
            }
        },
        open: {
            all: {
                path: "http://localhost:9000/charts.html"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-express");
    grunt.loadNpmTasks("grunt-open");
    grunt.registerTask("default", ["express", "open", "watch"]);
};
