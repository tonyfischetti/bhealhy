'use strict';

require('dotenv').config()

const { src, dest, series, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const nunjucksRender = require('gulp-nunjucks-render');
const mode = require("gulp-mode")();
const jsdoc = require('gulp-jsdoc3');

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const path = require('path');
const chalk = require("chalk");
const $ = require("shelljs");





const defaultTask = (cb) => {
  console.log(chalk.cyanBright("Hi from Gulp!"));
  cb();
};

const clean = (cb) => {
  $.rm('-rf', path.resolve(__dirname, 'dist'));
  $.rm('-rf', path.resolve(__dirname, 'docs'));
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
  return src('styles/**/*.css')
    .pipe(postcss([
                    postcssPresetEnv(),
                  ]))
    .pipe(mode.production(postcss([
      cssnano() ])))
    .pipe(dest('dist/styles/'));
};

const moveHTML = (cb) => {
  return src('pages/**/*.+(html|nunjucks|njk)')
    .pipe(nunjucksRender({
      path: ['templates']
    }))
    .pipe(mode.production(htmlmin({ collapseWhitespace: true })))
    .pipe(dest('dist/'));
};

const moveStatic = (cb) => {
  return src('static/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(dest('dist/static/'));
};

const moveAssets = (cb) => {
  return src('assets/**/*')
    .pipe(dest('dist/assets/'));
};

// const moveJS = (cb) => {
//   return new Promise((resolve, reject) => {
//     webpack(webpackConfig, (err, stats) => {
//       if (err) {
//         return reject(err);
//       }
//       if (stats.hasErrors()) {
//         return reject(new Error(stats.compilation.errors.join('\n')));
//       }
//       resolve();
//       })
//   })
// };

const moveJS = (cb) => {
  return src('js/**/*.+(js)')
    .pipe(dest('dist/js/'));
};

const doc = (cb) => {
  const config = require('./doc-jsdoc.json');
  // return src(['README.md', './js/**/*.js', './js/**/*.ts'], {read: false})
  // return src("js/**/*.*")
  return src("js/utils.ts")
    .pipe(jsdoc(config, cb));
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
                                moveStatic, moveJS, moveAssets));
exports.moveJS = moveJS;
exports.deploy = deploy;
exports.doc = doc;

