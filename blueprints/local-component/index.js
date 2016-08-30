/* eslint node: true */
var path = require('path');
var helpers = require('../helpers');

module.exports = {
  description: 'Generates a component for general use across application. Name must contain a hyphen.',

  normalizeEntityName: function(entityName) {
    return helpers.localComponentValidator(entityName);
  },

  filesPath: function(options) {
    return path.join(this.path, 'files');
  },

  fileMapTokens: function(options) {
    if (!options.pod) {
      throw 'Generator only valid in pod structure. Enable pods, or add "--pod" flag.';
    }

    return {
      __path__: function(options) {
        return path.join('app', options.podPath, options.dasherizedModuleName);
      }
    };
  }
};
