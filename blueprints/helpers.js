/* eslint node:true */
module.exports = {
  _findDash: function(val) {
    var regexTest = /([a-z]+-[a-z]+)/;
    return regexTest.test(val);
  },

  globalComponentValidator: function(val) {
    var findDash = this._findDash;

    if (val.indexOf('.') > 0) {
      throw 'Set path delimiter as "/" instead of ".".';
    } else if (val.indexOf('/') > 0 && findDash(val.split('.').pop())) {
      return val;
    } else if (val.indexOf('.') === -1 && val.indexOf('/') === -1 && findDash(val)) {
      return val;
    }
    throw 'Invalid component name. Must contain dash';
  },

  localComponentValidator: function(val) {
    var findDash = this._findDash;

    if (val.indexOf('.') > 0) {
      throw 'Set path delimiter as "/" instead of ".".';
    } else if (val.indexOf('.') === -1 && val.indexOf('/') === -1 && findDash(val)) {
      return val; // throw 'Local component must be set in a route pod directory. E.g.: ember g local-component application/my-component';
    } else if (val.indexOf('/') > 0 && findDash(val.split('.').pop())) {
      return val;
    }
    throw 'Invalid component name. Must contain dash';
  },

  reducerValidator: function(val) {
    var regexTest = /[a-z]+[A-Z1][a-z]+(?:[A-Z1][a-z]+)*/;

    if (!regexTest.test(val)) {
      throw 'Reducer needs to be in camelCase format.'
    }

    return val;
  }
}
