// Core
var gulp    = require('gulp');
var plumber = require('gulp-plumber');
const path    = require('path')

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

const BUNDLE = true;
const PRODUCTION = false;

const pkg = require(path.resolve(__dirname, './package.json'))

// Path folders
var paths = {
    js: {
        src: './src/js/**/*.js',
        dest: './dist/js'
    },
    json: {
        src: './src/js/**/*.json',
        dest: './dist/data'
    },
    bootstrap: {
        src: './src/js/vendor/bootstrap',
        dest: './dist/js/vendor'
    },
    css: {
        src: './src/scss/**/*.scss',
        dest: './dist/css'
    },
    html: {
        src: './src/views/**/*.html',
        dest: './dist'
    },
    php: {
        src: './src/php/**/*.php',
        dest: './dist'
    },
    dist: {
        dest: './dist',
    }
}

// Watch with html server
gulp.task('watch', ['del:dist','minify:html','styles:scss','scripts','js-compile:bootstrap'], function() {
    console.log('Starting watch task');

    require('./server.js');
    
    gulp.watch(paths.html, ['minify-html']);
    gulp.watch(paths.css, ['styles']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.json, ['dependencies']);

    livereload.listen();
});

// Styles
// remember comment out the sourcemaps when ready to push to the server
gulp.task('styles:scss', function() {
    console.log('Starting styles task');
    
    return gulp.src('./src/scss/style.scss')
        .pipe(plumber(function(err) {
            console.log('Styles error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.dist + '/css'))
        .pipe(livereload());
});

// Scripts
// remember comment out the sourcemaps when ready to push to the server
gulp.task('js-compile:scripts', function() {
    console.log('Starting scripts task');

    var scripts = [
        `${paths.js.root}/main.js`,
    ];

    return gulp.src(scripts)
        .pipe( plumber( function(err){
            console.log('Scripts error');
            console.log(err);
            this.emit('end');
            })
        )
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.dest))
        .pipe(livereload());
});

gulp.task('js-compile:dependencies', function() {
    console.log('Starting dependencies task');

    /* Libraries that your website needs
     * comment out jquery if you're using a CDN
     */
    var jsdependencies = [
        './node_modules/jquery/dist/jquery.min.js'
    ];

    var jsonfiles = [
        `${paths.json.root}/data.json`
    ];

    gulp.src(jsdependencies)
        .pipe(plumber(function(err) {
            console.log('Dependencies error');
            console.log(err);
            this.emit('end');
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/js'));

    gulp.src(jsonfiles)
        .pipe(plumber(function(err) {
            console.log('JSON files error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(jsonminify())
        .pipe(gulp.dest(paths.dist + '/data'));

    gulp.src('./src/.htaccess')
        .pipe(gulp.dest(paths.dist));
});

// Deletes the dist folder
gulp.task('del:dist', function() {
  return del.sync(paths.dist);
});

gulp.task('bootstrap:plugins', run('npm run js-compile-plugins'));

gulp.task('copy:bootstrap', function () {
    return gulp.src('./node_modules/bootstrap/js/src/**.js')
        .pipe(gulp.dest(paths.bootstrap.src));
});

gulp.task('js-compile:bootstrap', function(){
    if( BUNDLE){
        run('npm run js-compile-bundle');
    } else {
        run('npm run js-compile-standalone');
    }
});

// Minify html files
gulp.task('minify:html', function() {
    console.log('Starting minify:html task');

    return gulp.src(paths.html)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('minify:js-bootstrap', function(){
    let src = 'bootstrap.js';

    if( BUNDLE){
        src = 'bootstrap.bundle.js';
    }

    gulp.src(paths.js.dest + src)
        .pipe(plumber(function(err) {
            console.log('Dependencies error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(uglify({output: {comments: /^!/}}))
        .pipe(gulp.dest(paths.js.dest));
});

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