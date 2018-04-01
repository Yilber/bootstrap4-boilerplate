<h1 align="center">
  <a href="http://www.yilbermejia.com/"><img src="production/images/logo.png" alt="Personal Portfolio" width="200"></a>
   <br/><br/>Yilber Mejia<br/>
</h1>

<h3 align="center">Personal Portfolio Website and Blog</h3>

<div align="center">
[![Latest Version][project-version]](http://www.yilbermejia.com/) [![npm version][gulp-status]](https://www.npmjs.com/package/gulp) [![devDependency Status][devDependency-status]](https://badge.fury.io/js/gulp)

![screenshot](production/images/preview.jpg)
</div>

## Table of Contents

- [Background](#background)
- [Setup](#setup)
- [Dependencies](#dependencies)
- [Testing](#testing)
- [Structure](#structure)
- [Todo](#todo)
- [Release history](#release-history)
- [License](#license)

## Background

Initially the purpose of this project was to make a simple website where I could talk about myself and my school or side projects. Every time I was applying for an internship, they asked if I had a project that I could show them. The problem was that I didnt have a github account with my projects or anything I could show. As a result, I started working on the first version of my personal portfolio.

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
npm install
```

## Documentation

Is there a documentation?

## Browser support

* Chrome *(latest 2)*
* Edge *(latest 2)*
* Firefox *(latest 2)*
* Internet Explorer 9+
* Opera *(latest 2)*
* Safari *(latest 2)*

## Dependencies

List of dependencies used in the project

- [Twitter Bootstrap] - UI framework for modern web apps
- [Font Awesome] - For some of the icons used on the website 
- [jQuery] - javascript library
- [Google fonts] - Google fonts
- [Gulp] - the streaming build system
- [gulp-autoprefixer] - CSS autoprefixer
- [gulp-concat] - Concatenates files
- [gulp-plumber] - Error handling for gulp
- [gulp-sass] - Sass compiler
- [gulp-sourcemaps] - Sourcemaps for the scripts and CSS
- [gulp-uglify] - javascript minifier

## Testing

How to test an api or feature

## Structure

```
├── src
|   ├── images
|   ├── js
|   └── scss
|       ├── assets
|       ├── theme
|       └── theme.scss
├── dist
|   ├── css
|   |   └── style.css
|   ├── fonts
|   ├── images
|   ├── js
|   |   ├── main.min.js
|   |   ├── bootstrap.bundle.map
|   |   └── bootstrap.bundle.min.js
|   ├── index.html
|   ├── 404.html
|   └── .htaccess
```

## Todo

List of things to fix or add

- [X] Add a blog
- [X] Add AMP support
- [X] Optimize for speed

## Release History
* 0.0.1 - Initial release
	Added linting and initial eslint config
	Added sass and js compilation libraries
	added html minifier
	added dependencies compilation
* 0.0.2
	Added readme
	Added Bootstrap js
	changed file structure
	changed tasks names
* 0.0.3
	modified readme
	removed extra bootstrap js compilation steps and libraries
	simplified bootstrap compilation and minification
	removed extra libraries
	organized a config file
	moved .babelrc into package.js
* 1.0.0

## Bugs

If you have a question, feature request or a bug you need me to fix, please click [here](http://www.yilbermejia.com/bugreport) to file an issue.

## License

Copyright (c) 2018 Yilber Mejia.

Usage is provided under the [MIT License](http://http//opensource.org/licenses/mit-license.php). See LICENSE for the full details.

[project-version]: <https://img.shields.io/badge/version-4.0.0-green.svg>
[gulp-status]: <https://img.shields.io/npm/v/gulp.svg>
[devDependency-status]: <https://img.shields.io/badge/devDependencies-up%20to%20date-green.svg>
[Twitter Bootstrap]: <https://getbootstrap.com/docs/3.3/>
[Font Awesome]: <http://fontawesome.io/>
[jQuery]: <https://jquery.com/>
[Google fonts]: <https://fonts.google.com/>
[Gulp]: <https://www.npmjs.com/package/gulp>
[gulp-autoprefixer]: <https://www.npmjs.com/package/gulp-autoprefixer>
[gulp-concat]: <https://www.npmjs.com/package/gulp-concat>
[gulp-sourcemaps]: <https://www.npmjs.com/package/gulp-sourcemaps>
[gulp-uglify]: <https://www.npmjs.com/package/gulp-uglify>
[gulp-sass]: <https://www.npmjs.com/package/gulp-sass>
[gulp-plumber]: <https://www.npmjs.com/package/gulp-plumber>
