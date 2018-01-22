var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    autoPrefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass'),
    cleanCSS      = require('gulp-clean-css'),
    print         = require('gulp-print'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    sourcemaps    = require('gulp-sourcemaps'),

    setPrefix = [
      'last 2 version',
      '> 1%',
      'opera 12.1',
      'safari 6',
      'ie 9',
      'bb 10',
      'android 4'
    ],

    files = {
      sass: {
        watch: 'resource/assets/sass/components/*.scss',
        source: 'resource/assets/sass/app.scss',
        dest: 'public/assets/css/'
      },
      js: {
        source: [
          'resource/assets/js/*.js'
        ],
        dest: 'public/assets/js/'
      },
      maps: {
        dest: './'
      }
    }
;

// BrowserSync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
        baseDir: "public",
        serveStaticOptions: {
            extensions: ["html"]
        }
    }
    // proxy: 'localhost:42600',
    // open: false
  });
});

gulp.task('bs-reload', function () {
  browserSync .reload();
});

// Build

gulp.task('build:sass', function() {
  gulp.src(files.sass.source)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoPrefixer(setPrefix))
    .pipe(sourcemaps.write(files.maps.dest))
    .pipe(gulp.dest(files.sass.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(rename('app.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(files.sass.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:js', function() {
  gulp.src(files.js.source)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(files.js.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(files.js.dest))
    .pipe(print(function (file) { return file + ' has successfully created.' }));

  browserSync.reload();
});


// Watch files
gulp.task('watch', function() {
  gulp.watch(files.sass.watch, function (file) {
    gulp.src(file.path).pipe(print(function (file) { return file + ' has modified.' }));
    gulp.start('build:sass');
  });
  gulp.watch(files.js.source, function (file) {
    gulp.src(file.path).pipe(print(function (file) { return file + ' has modified.' }));
    gulp.start('build:js');
  });
  gulp.watch("./public/*.html").on("change", function (file) {
    gulp.src(file.path).pipe(print(function (file) { return file + ' has modified.' }));
    browserSync.reload();
  });
});


// Default
gulp.task('default', ['browser-sync', 'watch']);
