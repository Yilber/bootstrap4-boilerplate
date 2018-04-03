// Core
const gulp    = require('gulp');
const plumber = require('gulp-plumber');

// CSS
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');

// Javascript
const uglify = require('gulp-uglify');
const babel  = require('gulp-babel');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');

// Utilities
const jsonminify = require('gulp-jsonminify');
const sourcemaps = require('gulp-sourcemaps');
const rename     = require('gulp-rename');
const htmlmin    = require('gulp-htmlmin');
const livereload = require('gulp-livereload');
const del        = require('del');
const run        = require('gulp-run-command').default;

// Configurations
const {paths, babelConfig, sassConfig, htmlConfig, uglifyConfig, bootstrapConfig: {isBundle: bundle}} = require('./config.js');
const bootstrapType = bundle === true ? 'bundle' : 'standalone';

// Deletes the dist folder
gulp.task('delete:dist', () => {
    console.log('Deleting dist folder');

    return del.sync(paths.dest);
});

// Copies bootstrap to your project
gulp.task('copy:bootstrap', () => {
    console.log('Copying bootstrap to your project');

    return gulp.src('./node_modules/bootstrap/js/src/**.js')
        .pipe(gulp.dest(paths.bootstrap.src));
});

// Minifies all dependencies. The files go to the vendor folder.
gulp.task('copy:dependencies', () => {
    console.log('Copying dependencies');

    /* Libraries that your website needs.
     * Leave jquery here in case your CDN fails.
     */
    const jsdependencies = [
        './node_modules/jquery/dist/jquery.min.js',
    ];

    return gulp.src(jsdependencies)
        .pipe(plumber((err) => {
            console.log('Dependencies error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest(`${paths.dest}/js`));
});

// Copies .htaccess to the dist folder
gulp.task('copy:.htaccess', () => {
    return gulp.src('./node_modules/apache-server-configs/dist/.htaccess')
        .pipe(gulp.dest(paths.src));
});

gulp.task('initialize', ['copy:bootstrap-js', 'copy:js-dependencies', 'copy:.htaccess'], () => {
    console.log('Project\' initialization');
});

// Compiles and minifies style.scss into style.css
gulp.task('compile:styles', () => {
    console.log('Starting styles task');

    return gulp.src(`${paths.styles.src}/style.scss`)
        .pipe(plumber((err) => {
            console.log('Styles error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass(sassConfig))
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(livereload());
});

// Compiles all your scripts into main.min.js
gulp.task('compile:scripts', () => {
    console.log('Starting js-compile:scripts task');

    const scripts = [
        `${paths.js.src}/*.js`,
    ];

    return gulp.src(scripts)
        .pipe(plumber((err) => {
            console.log('Scripts error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(babel(babelConfig))
        .pipe(sourcemaps.write())
        .pipe(uglify(uglifyConfig))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(livereload());
});

// Compiles bootstrap plugins
gulp.task('compile:bootstrap-plugins', run('npm run js-compile-plugins'));

// Compiles bootstrap.js and bootstrap.bundle.js
gulp.task('compile:bootstrap', run(`npm run js-compile-${bootstrapType}`) );

// Minify html files
gulp.task('minify:html', () => {
    console.log('Starting minify:html task');

    return gulp.src(paths.html.src)
        .pipe(htmlmin(htmlConfig))
        .pipe(gulp.dest(paths.dest));
});

// Copies, lints and minifies json files into the data folder.
gulp.task('minify:json', () => {
    console.log('Starting dependencies task');
    
    // JSON files needed for the website
    const jsonfiles = [
        `${paths.json.src}/*json`,
    ];

    return gulp.src(jsonfiles)
        .pipe(plumber((err) => {
            console.log('JSON files error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(jsonminify())
        .pipe(gulp.dest(`${paths.dest}/data`));
});

// Minifies bootstrap.js and bootstrap.bundle.js
gulp.task('minify:bootstrap', () => {
    let src = 'bootstrap.js';

    if (isBundle) {
        src = 'bootstrap.bundle.js';
    }

    return gulp.src(`${paths.bootstrap.dest}/${src}`)
        .pipe(plumber((err) => {
            console.log('Dependencies error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(uglify(uglifyConfig))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.bootstrap.dest));
});

// Watch with html server
gulp.task('watch', ['del:dist', 'minify:html', 'minify:styles', 'js-compile:scripts', 'js-compile:bootstrap'], () => {
    console.log('Starting watch task');

    require('./server.js');

    gulp.src(`${paths.src}/.htaccess`)
        .pipe(gulp.dest(paths.dest));

    gulp.watch(paths.html, ['minify:html']);
    gulp.watch(paths.css, ['styles']);
    gulp.watch(paths.js, ['js-compile:scripts']);
    gulp.watch(paths.json, ['dependencies']);

    livereload.listen();
});
