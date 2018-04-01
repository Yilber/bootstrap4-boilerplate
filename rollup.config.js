'use strict'

const path     = require('path');
const babel    = require('rollup-plugin-babel');
const resolve  = require('rollup-plugin-node-resolve');
const BUNDLE   = process.env.BUNDLE === 'true';
const year     = new Date().getFullYear();
let fileDest   = 'bootstrap.js';
const external = ['jquery', 'popper.js'];
const plugins  = [
  babel({
    exclude: 'node_modules/**', // Only transpile our source code
    externalHelpersWhitelist: [ // Include only required helpers
      'defineProperties',
      'createClass',
      'inheritsLoose',
      'extends'
    ]
  })
];

const globals = {
  jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
  'popper.js': 'Popper'
};

if (BUNDLE) {
  fileDest = 'bootstrap.bundle.js'
  // Remove last entry in external array to bundle Popper
  external.pop()
  delete globals['popper.js']
  plugins.push(resolve())
}

module.exports = {
  input: path.resolve(__dirname, './src/js/vendor/bootstrap/index.js'),
  output: {
    banner: `/*!
  * Bootstrap v4.0.0 (https://getbootstrap.com)
  * Copyright 2011-${year} The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */`,
    file: path.resolve(__dirname, `./dist/js/${fileDest}`),
    format: 'umd',
    globals,
    name: 'bootstrap'
  },
  external,
  plugins
}
