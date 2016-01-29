/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'), //npm install gulp --save-dev
    less = require("gulp-less"), //npm install gulp-less --save-dev;
    ts = require("gulp-typescript"); //npm install gulp-typescript --save-dev;


var paths = {
    srcTs: "src/js/",
    srcLess: "src/less/",

    destTs: "wwwroot/js/",
    destCss: "wwwroot/css/"
};

gulp.task("compile:less", function () {
    console.log("less compile başladı.");
    return gulp.src(paths.srcLess + "main.less")
               .pipe(less())
               .pipe(gulp.dest(paths.destCss));

});



gulp.task("compile:ts", function() {
    
    console.log("ts compile başladı.");
    return gulp.src(paths.srcTs + "main.ts")
               .pipe(ts({ out: "main.js" }))
               .pipe(gulp.dest(paths.destTs));

});



gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("watch", function() {
    gulp.watch(paths.srcLess + "/**/*.less", ["compile:less"]);
    gulp.watch(paths.srcTs + "/**/main.ts", ["compile:ts"]);
});