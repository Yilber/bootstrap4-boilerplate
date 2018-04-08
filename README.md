# Bootstrap 4 boilerplate with Sass.

[![Latest Version][project-version]](http://www.yilbermejia.com/) [![npm version][gulp-status]](https://www.npmjs.com/package/gulp) [![devDependency Status][devDependency-status]](https://badge.fury.io/js/gulp)

## Prerequisites

You will need the following installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)

## Installation

Clone this repo to your computer and run npm install to install all the dependencies.
```
git clone https://github.com/Yilber/boilerplate.git
cd boilerplate
```

install gulp, rollup, @babel/core, @babel/cli and cross-env globally
```
npm install -g gulp@^3.9.1 rollup@^0.57.1 @babel/core@7.0.0-beta.37 @babel/cli@7.0.0-beta.37 cross-env@^5.1.3
```

install the all the packages
```
npm install
```

## How to start the server
Starting the server will compile everything. Here's how to do it.
```
gulp watch
```
## Scaffolding

```
├── src
│   ├── data
│   ├── fonts
│   ├── images
│   ├── js
│   │   ├── vendor
│   │   ├── main.js
│   │   └── plugin.js
│   └── scss
│       ├── theme
│       ├── bootstrap.scss
│       └── style.scss
├── dist
│   ├── css
│   │   ├── fonts
│   │   └── style.min.css
│   ├── data
│   ├── images
│   ├── js
│   │   ├── bootstrap.bundle.js
│   │   ├── bootstrap.bundle.js.map
│   │   ├── bootstrap.bundle.min.js
│   │   ├── jquery.min.js
│   │   └── main.min.js
│   ├── templates
│   │   ├── footer.php
│   │   └── header.php
│   ├── .htaccess
│   ├── 404.html
│   ├── 404.php
│   ├── index.html
│   └── index.php
├── docs
│   └── README.md
├── .babelrc.js
├── .editorconfig
├── .eslintrc
├── .gitignore
├── config.js
├── gulpfile.js
├── LICENSE
├── package.json
├── README.md
├── rollup.config.js
└── server.js
```

## Todo

List of things to fix or add

- [ ] Improve README.md: add documentation, images etc...
- [ ] Add CSS linting
- [ ] Add testing: Mocha?
- [ ] Browser support: Modernizr
- [ ] Add an engine template:Nunjucks, Handlebars, Pug(Jade) or another one

## Bugs

If you have questions, feature requests or a bug you want to report, please click [here](https://github.com/Yilber/boilerplate/issues) to file an issue.

## License

Copyright (c) 2018 Yilber Mejia.

Usage is provided under the [MIT License](http://http//opensource.org/licenses/mit-license.php). See [LICENSE](https://github.com/Yilber/boilerplate/blob/master/LICENSE) for the full details.

[project-version]: <https://img.shields.io/badge/version-1.0.0-green.svg>
[gulp-status]: <https://img.shields.io/npm/v/gulp.svg>
[devDependency-status]: <https://img.shields.io/badge/devDependencies-up%20to%20date-green.svg>
[Twitter Bootstrap]: <https://getbootstrap.com/docs/3.3/>
[jQuery]: <https://jquery.com/>
[Gulp]: <https://www.npmjs.com/package/gulp>
[gulp-autoprefixer]: <https://www.npmjs.com/package/gulp-autoprefixer>
[gulp-sourcemaps]: <https://www.npmjs.com/package/gulp-sourcemaps>
[gulp-uglify]: <https://www.npmjs.com/package/gulp-uglify>
[gulp-sass]: <https://www.npmjs.com/package/gulp-sass>
[gulp-plumber]: <https://www.npmjs.com/package/gulp-plumber>
