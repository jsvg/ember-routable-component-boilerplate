/* eslint node: true */
var fs = require('fs-extra');
var path = require('path');
var chalk = require('chalk');
var EmberRouterGenerator = require('ember-router-generator');
var helpers = require('../helpers');

module.exports = {
  description: 'Generates a route with a routed presentational component, and registers the route with the router.',
  locals: function(options) {

    return {};
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
  },

  shouldTouchRouter: function(name, options) {
    var isIndex = name === 'index';
    var isBasic = name === 'basic';
    var isApplication = name === 'application';

    var entityTouchesRouter = !isBasic && !isIndex && !isApplication;
    return (entityTouchesRouter && !options.dryRun && !options.skipRouter);
  },

  afterInstall: function(options) {
    updateRouter.call(this, 'add', options);
  },

  afterUninstall: function(options) {
    updateRouter.call(this, 'remove', options);
  }
};


function updateRouter(action, options) {
  var entity = options.entity;
  var actionColorMap = {
    add: 'green',
    remove: 'red'
  };
  var color = actionColorMap[action] || 'gray';

  if (this.shouldTouchRouter(entity.name, options)) {
    writeRoute(action, entity.name, options);

    this.ui.writeLine('updating router');
    this._writeStatusToUI(chalk[color], action + ' route', entity.name);
  }
}

function findRouter(options) {
  var routerPathParts = [options.project.root];

  if (options.dummy && options.project.isEmberCLIAddon()) {
    routerPathParts = routerPathParts.concat(['tests', 'dummy', 'app', 'router.js']);
  } else {
    routerPathParts = routerPathParts.concat(['app', 'router.js']);
  }

  return routerPathParts;
}

function writeRoute(action, name, options) {
  var routerPath = path.join.apply(null, findRouter(options));
  var source = fs.readFileSync(routerPath, 'utf-8');

  var routes = new EmberRouterGenerator(source);
  var newRoutes = routes[action](name, options);

  fs.writeFileSync(routerPath, newRoutes.code());
}
