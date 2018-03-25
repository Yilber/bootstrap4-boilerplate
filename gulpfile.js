// Core
var gulp          = require('gulp');
var plumber       = require('gulp-plumber');

//CSS
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');

// Javascript
var uglify = require('gulp-uglify');
var babel  = require("gulp-babel");
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var run    = require('gulp-run-command').default;

// Utilities
var jsonminify = require('gulp-jsonminify');
var sourcemaps = require('gulp-sourcemaps');
var rename     = require('gulp-rename');
var htmlmin    = require('gulp-htmlmin');
var livereload = require('gulp-livereload');
var del        = require('del');

// Path folders
var SCRIPT_PATH = './src/js/**/*.js';
var JSON_PATH   = './src/js/**/*.json';
var SCSS_PATH   = './src/scss/**/*.scss';
var HTML_PATH   = './src/docs/html/**/*.html';
var PHP_PATH    = './src/docs/php/**/*.php';
var PUBLIC_PATH = './dist';

// Watch with html server
gulp.task('watch', ['del:dist','minify-html','styles','scripts','build:standalone'], function() {
    console.log('Starting watch task');

    require('./server.js');
    
    gulp.watch( HTML_PATH, ['minify-html'] );
    gulp.watch( SCSS_PATH, ['styles'] );
    gulp.watch( SCRIPT_PATH, ['scripts'] );
    gulp.watch( JSON_PATH, ['dependencies'] );

    livereload.listen();
});

// Minify html files
gulp.task('minify-html', function() {
    console.log('Starting minify-html task');

    return gulp.src( HTML_PATH )
        .pipe( htmlmin({
            collapseWhitespace: true
        }))
        .pipe( gulp.dest('./dist') );
});

// Styles
// remember comment out the sourcemaps when ready to push to the server
gulp.task('styles', function() {
    console.log('Starting styles task');
    
    return gulp.src('./src/scss/style.scss' )
        .pipe( plumber( function(err){
            console.log('Styles error');
            console.log(err);
            this.emit('end');
        }))
        .pipe( sourcemaps.init() )
        .pipe( autoprefixer() )
        .pipe( sass({
            outputStyle:'compressed'
        }))
        .pipe( sourcemaps.write() )
        .pipe( rename('style.css') )
        .pipe( gulp.dest(PUBLIC_PATH + '/css') )
        .pipe( livereload() );
});

// Scripts
// remember comment out the sourcemaps when ready to push to the server
gulp.task('scripts', ['dependencies'], function() {
    console.log('Starting scripts task');

    var scripts = [
        './src/js/main.js',
    ];

    return gulp.src(scripts)
        .pipe( plumber( function(err){
            console.log('Scripts error');
            console.log(err);
            this.emit('end');
            })
        )
        .pipe( eslint() )
        .pipe( eslint.format() )
        .pipe( eslint.failAfterError() )
        .pipe( sourcemaps.init() )
        .pipe( concat( 'main.min.js' ) )
        .pipe( babel( {
            presets: ['env']
        }))
        .pipe( sourcemaps.write() )
        .pipe( uglify() )
        .pipe( gulp.dest(PUBLIC_PATH + '/js') )
        .pipe( livereload() );
});

gulp.task('dependencies', function(){
    console.log('Starting dependencies task');

    /* Libraries that your website needs
     * comment out jquery if you're using a CDN
     */
    var jsfiles = [
        './node_modules/jquery/jquery.min.js'
    ];

    var jsonfiles = [
        './src/data/data.json'
    ];

    gulp.src( jsfiles )
        .pipe( plumber( function(err){
            console.log('Dependencies error');
            console.log(err);
            this.emit('end');
            })
        )
        .pipe( uglify() )
        .pipe( gulp.dest(PUBLIC_PATH + '/js') );

    gulp.src( jsonfiles )
        .pipe( plumber( function(err){
            console.log('JSON files error');
            console.log(err);
            this.emit('end');
            })
        )
        .pipe( eslint() )
        .pipe( eslint.format() )
        .pipe( eslint.failAfterError() )
        .pipe( jsonminify() )
        .pipe( gulp.dest(PUBLIC_PATH + '/data') );

    gulp.src( './src/.htaccess' )
        .pipe( gulp.dest( PUBLIC_PATH ) );
});

// Deletes the dist folder
gulp.task('del:dist', function() {
  return del.sync('./dist');
});

gulp.task('build:bundle', run ('npm run js-compile-bundle'));
gulp.task('build:standalone', run ('npm run js-compile-standalone'));
gulp.task('build:plugins', run ('npm run js-compile-plugins'));
gulp.task('build:js-compile', run ('npm run js-compile'));

gulp.task('build:js-minify', run ('npm run js-minify'));
gulp.task('build:all', ['build:js-compile'], run ('npm run js-minify'));

// gulp.task('rollup', function(){
//     console.log('Starting rollup task');
//     var jsfiles = './src/js/bootstrap-index.js';

//     return rollup('rollup.config.js')
//         .pipe( plumber( function(err){
//             console.log('Dependencies error');
//             console.log(err);
//             this.emit('end');
//             })
//         )
//         // point to the entry file.
//         .pipe(source(jsfiles))
//         // we need to buffer the output, since many gulp plugins don't support streams.
//         .pipe(buffer())
//         .pipe(sourcemaps.init({loadMaps: true}))
//         // some transformations like uglify, rename, etc.
//         .pipe(sourcemaps.write('.'))
//         .pipe( gulp.dest(PUBLIC_PATH + '/js') );
// });