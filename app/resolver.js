import Resolver from 'ember-resolver';

export default Resolver.extend({
  resolveRoute(parsedName) {
    let componentsFullName = `${parsedName.type}:${parsedName.fullNameWithoutType}`;
    return this._super(this.parseName(componentsFullName)) || this._super(parsedName);
  },
  resolveController(parsedName) {
    let componentsFullName = `${parsedName.type}:${parsedName.fullNameWithoutType}`;
    return this._super(this.parseName(componentsFullName)) || this._super(parsedName);
  }
});
