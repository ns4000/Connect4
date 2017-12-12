var gulp        = require('gulp');
var browserSync = require('browser-sync').create();


// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("dist/*.js", ['js-watch']);
    gulp.watch("*.html", ['js-watch']);
    gulp.watch("style/*.css", ['js-watch']);
});
