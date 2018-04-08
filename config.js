module.exports = {
    banner: `/*!
 * Title: Boilerplate
 * Version: 1.0.0
 * Last Update: 04/07/2018
 * Author: Yilber Mejia
 * Repo: https://github.com/Yilber/boilerplate
 * Issues: https://github.com/Yilber/boilerplate/issues
 * Description: Frontend boilerplate based on Bootstrap 4 and Sass. The javascript files for
Bootstrap are compiled with Gulp, babel and rollup.
*/`,

    uglifyConfig: {
        output: {
            comments: /^!/
        }
    },

    sassConfig: {
        outputStyle: 'compressed'
    },

    htmlConfig: {
        collapseWhitespace: true
    },

    bootstrapConfig: {
        isBundle: true
    },

    paths: {
        src: './src',
        dest: './dist',

        js: {
            src: './src/js',
            dest: './dist/js'
        },

        json: {
            src: './src/data',
            dest: './dist/js'
        },

        fonts: {
            src: './src/fonts',
            dest: './dist/css'
        },

        images: {
            src: './src/images',
            dest: './dist'
        },

        bootstrap: {
            src: './src/js/vendor/bootstrap',
            dest: './dist/js'
        },

        styles: {
            src: './src/scss',
            dest: './dist/css'
        },

        views: {
            src: './src/views',
            dest: './dist'
        },
    }
};
