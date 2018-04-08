// Core
const gulp    = require('gulp');
const plumber = require('gulp-plumber');
const rollup  = require('gulp-rollup');

// CSS
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-sass');

// Javascript
const uglify = require('gulp-uglify');
const babel  = require('rollup-plugin-babel');
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
const {
    paths,
    sassConfig,
    banner,
    htmlConfig,
    uglifyConfig,
    bootstrapConfig: { isBundle: bundle }
} = require('./config.js');

// Deletes the dist folder
gulp.task('delete:dist', () => {
    console.log('Deleting dist folder');

    return del.sync(paths.dest);
});

// Copies bootstrap to your project
gulp.task('copy:fonts-images', () => {
    console.log('Copying fonts and images to your project');

    gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));

    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
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
        .pipe(gulp.dest(`${paths.dest}/js`))
        .pipe(livereload());
});

// Copies .htaccess to the dist folder
gulp.task('copy:.htaccess', () => {
    gulp.src(`${paths.src}/.htaccess`)
        .pipe(gulp.dest(paths.dest));
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
    console.log('Starting compile:scripts task');

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
        .pipe(rollup({
            input: `${paths.js.src}/main.js`,
            output: {
                format: 'umd',
                name: 'main',
                globals: {
                    jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
                },
                banner: banner
            },
            external: ['jquery'],
            plugins: [
                babel({
                    exclude: 'node_modules/**', // Only transpile our source code
                    externalHelpersWhitelist: [ // Include only required helpers
                        'defineProperties',
                        'createClass',
                        'inheritsLoose',
                        'extends'
                    ]
                })
            ]
        }))
        .pipe(sourcemaps.write())
        .pipe(uglify(uglifyConfig))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(livereload());
});

// Compiles bootstrap plugins
gulp.task('compile:bootstrap-plugins', run('npm run js-compile-plugins'));

// Compiles bootstrap.js and bootstrap.bundle.js
gulp.task('compile:bootstrap', run('npm run js-compile-bootstrap'));

// Minify html files
gulp.task('minify:html-php', () => {
    console.log('Starting minify:html-php task');

    gulp.src(`${paths.views.src}/**/*.php`)
        .pipe(gulp.dest(paths.views.dest));

    gulp.src(`${paths.views.src}/templates/*.php`)
        .pipe(gulp.dest(`${paths.views.dest}/templates`));

    return gulp.src(`${paths.views.src}/**/*.html`)
        .pipe(htmlmin(htmlConfig))
        .pipe(gulp.dest(paths.dest))
        .pipe(livereload());
});

// Copies, lints and minifies json files into the data folder.
gulp.task('minify:json', () => {
    console.log('Starting minify:json task');

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
        .pipe(gulp.dest(`${paths.dest}/data`))
        .pipe(livereload());
});

// Minifies bootstrap.js and bootstrap.bundle.js
gulp.task('minify:bootstrap', ['compile:bootstrap'], () => {
    console.log('Starting minify:bootstrap task');

    let src = 'bootstrap.js';

    if (bundle) {
        src = 'bootstrap.bundle.js';
    }

    return gulp.src(`${paths.bootstrap.dest}/${src}`)
        .pipe(plumber((err) => {
            console.log('Dependencies error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(uglify(uglifyConfig))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.bootstrap.dest))
        .pipe(livereload());
});

// Watch with html server
gulp.task('watch', ['delete:dist', 'copy:.htaccess', 'copy:fonts-images', 'copy:dependencies',
    'compile:styles', 'compile:scripts', 'minify:html-php', 'minify:json',
    'minify:bootstrap'], () => {

    console.log('Starting watch task');

    require('./server.js');

    gulp.watch(`${paths.views.src}/**/*.html`, ['minify:html-php']);
    gulp.watch(`${paths.views.src}/**/*.php`, ['minify:html-php']);
    gulp.watch(`${paths.json.src}/**/*.json`, ['minify:json']);
    gulp.watch(`${paths.bootstrap.src}/*.js`, ['minify:bootstrap']);
    gulp.watch(`${paths.styles.src}/**/*.scss`, ['compile:styles']);
    gulp.watch(`${paths.js.src}/**/*.js`, ['compile:scripts']);

    livereload.listen();
});
