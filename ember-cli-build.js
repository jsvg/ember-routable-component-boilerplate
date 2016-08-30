/* eslint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var autoprefixer = require('autoprefixer');
var nano = require('cssnano');
var nested = require('postcss-nested');
var cssnext = require('postcss-cssnext')

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    cssModules: {
      plugins: [
        autoprefixer(['> 1%', 'last 2 versions', 'IE 8']),
        nested,
        nano,
        cssnext
      ]
    }
  });

  return app.toTree();
};
