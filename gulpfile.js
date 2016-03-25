/**
 * Created by jaylon on 16-3-25.
 */
var gulp = require('gulp');
var  browserSync = require('browser-sync').create();

//file
var scssSrc = ["./app/sass/*.sass"];
var scssDist = "./dist/css";

var jadeSrc = ["./app/jade/*.jade"];
var jadeDist = "./dist/html";

var coffeeSrc = ["./app/coffee/*.coffee"];
var coffeeDist = "./dist/js";





// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        // server: {
        //     baseDir: './'
        // }
        proxy: '127.0.0.1:8000',
        notify: false,
        ghostMode: {
        	clicks: false,
        	location: true,
        	forms: false,
        	scroll: true
        }
    });
    gulp.watch(['**/*.css']).on('change', browserSync.reload);
    gulp.watch(['**/*.html']).on('change', browserSync.reload);
    gulp.watch(['**/*.js', '!node_modules/**/*']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);