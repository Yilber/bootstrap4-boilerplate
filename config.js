module.exports = {
    babelConfig: {
        presets: [
          [
            'es2015',
            {
              loose: true,
              modules: false,
              exclude: 'transform-typeof-symbol'
            }
          ]
        ],
        plugins: [
          'external-helpers',
          'transform-object-rest-spread',
          'transform-es2015-modules-strip'
        ]
    },

    uglifyConfig: {
        output: {
            comments: /^!/
        }
    },

    sassConfig: {
        outputStyle: 'expanded'
    },

    htmlConfig: {
        collapseWhitespace: true
    },

    bootstrapConfig: {
        isBundle: false,
        
        bannerJs: `/*!
          * Bootstrap v4.0.0 (https://getbootstrap.com)
          * Copyright 2011-2018 The Bootstrap Authors https://github.com/twbs/bootstrap/graphs/contributors
          * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
          */`,

        bannerCSS: `/*!
 * Bootstrap Docs (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see https://creativecommons.org/licenses/by/3.0/.
 */`
    },
    
    paths: {
        src: './src',

        dest: './dist',

        js: {
            src: './src/js',
            dest: './dist/js',
            vendor: './src/js/vendor'
        },

        json: {
            src: './src/data',
            dest: './dist/js'
        },

        bootstrap: {
            src: './src/js/vendor/bootstrap',
            dest: './dist/js/vendor',
        },

        styles: {
            src: './src/scss',
            dest: './dist/css'
        },

        html: {
            src: './src/views/*.html',
            dest: './dist'
        },

        php: {
            src: './src/php',
            dest: './dist'
        }
    }
};