module.exports = {
	babel: {
	    presets: [
	      [
	        "env",
	        {
	          loose: true,
	          modules: false,
	          exclude: "transform-typeof-symbol"
	        }
	      ]
	    ],
	    plugins: [
	      "external-helpers",
	      "transform-object-rest-spread",
	      "transform-es2015-modules-strip",
	    ]
	},
	
	paths = {
	    js: {
	        root: './src/js',
	        src: './src/js/**/*.js',
	        dest: './dist/js'
	    },

	    json: {
	        root: './src/data',
	        src: './src/data/**/*.json',
	        dest: './dist/js'
	    },

	    bootstrap: {

	        src: './src/js/vendor/bootstrap.js',
	        dest: './dist/js/vendor'
	    },

	    styles: {
	        src: './src/scss/**/*.scss',
	        dest: './dist/css',
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
};