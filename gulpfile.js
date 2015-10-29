'use strict';

var gulp            = require('gulp')
    , sourcemaps    = require('gulp-sourcemaps')
    , path          = require('path')
    , htmlmin       = require('gulp-htmlmin')
    , sass          = require('gulp-sass')
    , gutil         = require('gulp-util')
    , minifyCSS     = require('gulp-minify-css')
    , autoprefixer  = require('gulp-autoprefixer')
    , concat        = require('gulp-concat')
    , notify        = require('gulp-notify')
    , shell         = require('gulp-shell')
    , cp            = require('child_process')
    , browserSync   = require('browser-sync');


/**
 * Copy files
 */

gulp.task('copy', function(){
    gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('_site/css'));
    
    gulp.src('node_modules/modernizr')
        .pipe(shell(
            ['bin/modernizr -c lib/config-all.json'],
            {
                cwd: './node_modules/modernizr/'
            }
        ));     
    gulp.src('node_modules/modernizr/modernizr.js')
        .pipe(gulp.dest('_js/'));
    
    gulp.src('node_modules/jquery/dist/*')
        .pipe(gulp.dest('_js/vendor/jquery'));

});

/**
 * Build JS 
 */

gulp.task('js', function(){
    return gulp.src(['_js/src/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'));
});

gulp.task('js-build',['js', 'jekyll'])

/**
 * Filter CSS
 */

gulp.task('css', function () {
    return gulp.src('_site/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer('last 10 versions', 'ie 9'))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('_site/css/'))
        //.pipe(notify("Compiled sass"))
        .pipe(browserSync.reload({stream: true}));
});



/**
 * Filter HTML 
 */

gulp.task('html', ['jekyll'], function() {
    gulp.src([path.join('_site', '*.html'),path.join('_site', '*/*/*/*.html')])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('_site'))
        .pipe(browserSync.reload({stream:true, once: true}));
});

/**
 * Build the Jekyll Site
 */

gulp.task('jekyll', function (gulpCallBack){
     var spawn = cp.spawn;
     var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});
 
     jekyll.on('exit', function(code) {
         gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
     });
});

/**
 * Watch files for changes
 */

gulp.task('watch', ['copy'], function(){

    browserSync.init({
        port: 4000,
        server: {
          baseDir: '_site'
        },
        browser: "safari"
    });

    gulp.watch('_js/src/*.js', ['js-build']);
    gulp.watch(['*.html', '_sass/*.scss', '_layouts/*.html', '_includes/*.html', '_posts/*'], ['jekyll']);
    gulp.watch('_site/*.html').on('change', browserSync.reload);
    
});

/**
 * Default task used for development. 
 */
gulp.task('default', ['watch'])

/**
 * Production task. 
 */
gulp.task('production', ['copy', 'jekyll', 'html', 'css', 'js'])












