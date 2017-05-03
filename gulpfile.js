var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    jsdoc = require('gulp-jsdoc3'),
    browserify = require('gulp-browserify'),
    pump = require('pump');

/** JS compression */
gulp.task('js', function() {
    gulp.src('src/script/*.js')
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals: true,
            transform: [babelify.configure({
                presets: ['es2015']
            })]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/** Sass compression */
gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('src/style'))
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/** HTML compression */
gulp.task('htmlmin', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: false
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/** Gulp watch */
gulp.task('watch', function() {
    var server = livereload();
    gulp.watch('src/script/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch("src/*.html", ['htmlmin'])
});

/** Browser-sync */
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });
});
/** Documentation */
gulp.task('doc', function(cb) {
    gulp.src(['README.md', 'src/script/**/*.js'], {
            read: false
        })
        .pipe(jsdoc(cb));
});

//"One to rule them all"
gulp.task('default', ['htmlmin', 'sass', 'js', 'watch', 'browser-sync', 'doc']);
