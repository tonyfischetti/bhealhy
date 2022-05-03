'use strict';

require('dotenv').config()

const { src, dest, series, parallel } = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const nunjucksRender = require('gulp-nunjucks-render');

const path = require('path');
const chalk = require("chalk");
const $ = require("shelljs");

// const autoreset = require('postcss-autoreset');
//
//

const defaultTask = (cb) => {
  console.log(chalk.cyanBright("Hi from Gulp!"));
  cb();
};

const clean = (cb) => {
  $.rm('-rf', path.resolve(__dirname, 'dist'));
  cb();
};

const mrproper = (cb) => {
  return cache.clearAll(cb);
};

const moveRootThings = (cb) => {
  return src('root-things/*.*')
    .pipe(dest('dist/'));
};

const moveCSS = (cb) => {
  return src('styles/*.css')
    .pipe(postcss([
                    // autoreset({
                    //   reset: "initial"
                    // }),
                    postcssPresetEnv(),
                    cssnano()
                  ]))
    .pipe(dest('dist/styles/'));
};

const moveHTML = (cb) => {
  // return src('*.html')
  return src('pages/**/*.+(html|nunjucks|njk)')
    .pipe(nunjucksRender({
      path: ['templates']
    }))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
};

const moveStatic = (cb) => {
  return src('static/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(dest('dist/static/'))
};

// TODO: USE WEBPACK!
const moveJS = (cb) => {
  return src('js/*.js')
    .pipe(babel())
    .pipe(uglify())
    // .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js/'));
};

// TODO: have two modes (including one that minifies)

const deploy = (cb) => {
  $.exec("rsync -Phav --delete dist/ polygram:~/3BHealthy.thepolygram.com");
  cb();
};


exports.default = defaultTask;
exports.clean = clean;
exports.mrproper = mrproper;
exports.build = series(clean,
                       parallel(moveRootThings, moveCSS, moveHTML,
                                moveStatic, moveJS));
exports.deploy = deploy;

