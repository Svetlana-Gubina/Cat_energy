"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
// var csso = require('gulp-csso');
// var rename = require("gulp-rename");
// var imagemin = require('gulp-imagemin');
// var webp = require('gulp-webp');
// var svgstore = require('gulp-svgstore');
// var del= require('del');
// var posthtml = require('gulp-posthtml');
// var include = require('posthtml-include');
// var htmlmin = require('gulp-htmlmin');
// var uglify = require('gulp-uglify');
// var pipeline = require('readable-stream').pipeline;

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("src/css"))
    .pipe(server.stream());
    // .pipe(csso())
    // .pipe(rename('style.min.css'))
    // .pipe(sourcemap.write("."))
    // .pipe(gulp.dest("build/css"))
    // .pipe(server.stream());
});

// gulp.task("normalize", function () {
//   return gulp.src("src/css/normalize.css")
//     .pipe(csso())
//     .pipe(rename('normalize.min.css'))
//     .pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });

// gulp.task('html', function () {
//   return gulp.src('src/*.html')
//   .pipe(posthtml([
//       include()
//   ]))
//   .pipe(htmlmin({ collapseWhitespace: true }))
//   .pipe(gulp.dest('build'));
// });

gulp.task("server", function () {
  server.init({
    // server: "build/",
    server: "src/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.sass", gulp.series("css"));
  // gulp.watch('src/img/icon-*.svg', gulp.series('sprite', 'html','refresh'));
  // gulp.watch("src/*.html", gulp.series('html','refresh'));
  gulp.watch("source/*.html").on("change", server.reload);
});

// gulp.task('refresh', function(done) {
// server.reload();
// done();
// });

// gulp.task('images', function() {
//   return gulp.src('src/img/**/*.{png,jpg,svg}')
//   .pipe(imagemin([
//     imagemin.gifsicle({interlaced: true}),
//     imagemin.mozjpeg({quality: 75, progressive: true}),
//     imagemin.optipng({optimizationLevel: 5}),
//     imagemin.svgo({
//         plugins: [
//             {removeViewBox: true},
//             {cleanupIDs: false}
//         ]
//     })
//   ]))
//   .pipe(gulp.dest('build/img'));
//   });
// 
//   gulp.task('webp', function() {
//   return gulp.src('src/img/**/*.{png,jpg}')
//   .pipe(webp({quality: 90}))
//   .pipe(rename({
//     extname: ".webp"
//   }))
//   .pipe(gulp.dest('build/img'));
//   });
// 
//   gulp.task('sprite', function () {
//   return gulp.src('src/img/icon-*.svg')
//   .pipe(svgstore({
//       inlineSvg: true
//   }))
//   .pipe(rename('sprite.svg'))
//   .pipe(gulp.dest('build/img'));
//   });

// gulp.task('compress', function () {
//   return pipeline(
//         gulp.src('src/js/**/*.js'),
//         uglify(),
//         rename({
//           suffix: ".min",
//           extname: ".js"
//         }),
//         gulp.dest('build/js')
//   );
// });// 
// gulp.task('copy', function() {
//   return gulp.src([
//       'src/fonts/**/*.{woff,woff2}',
//       'src/img/**',
//       'src/js/**',
//       'src/*.ico'
//   ], {
//       base: 'src'
//   })
//   .pipe(gulp.dest('build'));
// });

// gulp.task('clean', function() {
//   return del('build');
// });

// gulp.task('build', gulp.series(
//   'clean',
//   'copy',
//   'css',
//   "normalize",
//   'sprite',
//   'compress',
//   'images',
//   'webp',
//   'html',
// ));

// gulp.task('start', gulp.series('build', 'server'));
gulp.task("start", gulp.series("css", "server"));
