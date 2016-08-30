# Ember Routable Component Boilerplate

*What is this?* A preconfigured Ember boilerplate project that enhances component-driven development in Ember by:
* enabling [routable components](https://github.com/mdehoog/ember-routable-components-shim/)
* creating handy blueprints
* providing creature comforts like linting and css modules

## Routable Components
The `ember generate routable-componet <name>` blueprint generates a `route.js` and `component.js` in the appropriate pods folder, and then updates the router to account for the new route. *There is no template.* Display markup is defined in the `component.js` file using the `hbs` function of `htmlbars-inline-precompile`. For example:
```js
import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
    layout: hbs`
        <h1>Ahoy</h1>
    `
});
```
The component file associated with a route should generally be thought of as a __container component__ that hosts a set of nested components local to that route and/or global components.

## Local-Component and Global-Component Blueprints
The nomenclature for these two varieties of components should be intuitive. Global components are highly-reusable components such as a button, input form, table, or grid-container. Local components are specific to the context of its parent such as a search box component that exists in a search route. The search box may be derived of a global input component. This structure is described in [DockYard's Ember Styleguide](https://github.com/dockyard/styleguides/blob/master/engineering/ember.md#organizing-your-modules).

To support this, two blueprints are available for local and global components. Considering the search example above, blueprints could be used to create the appropriate files quickly with this sequence.
1. `ember g routable-component search`
2. `ember g local-component search/search-bar`
3. `ember g global-component input-form`

This will create the following files:
```
| - search
  | - route.js
  | - component.js
  | - search-bar
    | - component.js
  - components
  | - input-form
    | - component.js
```

## Creature Comforts
This boilerplate Ember project comes with some great addons that provide developement enahancements.

### Linting
ESlint has been enabled (in place of JShint) via [ember-cli-eslint](https://github.com/ember-cli/ember-cli-eslint). It is preconfigured to the rules sets of: eslint's recommended, ember-cli-eslints recommended, and finally DockYard's ember-suave rules.

### CSS Modules
Preconfiguration of [ember-css-modules](https://github.com/salsify/ember-css-modules) to facilitate all the goodness of PostCSS and cssnext features. CSSnano is included to minify CSS.

## Non-Default Dependency List
* [ember-css-modules](https://github.com/salsify/ember-css-modules): localized CSS and loading/configuration of CSS plugins (in `ember-cli-build.js`)
* [ember-routable-components-shim](https://github.com/mdehoog/ember-routable-components-shim/): unlock routable components
* [ember-cli-eslint](https://github.com/ember-cli/ember-cli-eslint): ESlinting for ember-cli; batteries:
  * [ESlint](eslint.org): linter dependency
  * [eslint-plugin-ember-suave](https://github.com/DockYard/eslint-plugin-ember-suave): DockYard linting rules for ESlint
* [PostCSS](postcss.org): latest and greatest CSS tool; batteries:
  * [Autoprefixer](https://github.com/postcss/autoprefixer): CSS autoprefixing based on configuration in `ember-cli-build.js`
  * [cssnano](cssnano.co): CSS minification
  * [PostCSS-cssnext](cssnext.io/): unlock cssnext features
  * [PostCSS-nested](https://github.com/postcss/postcss-nested): permit nesting

## Other Notes
Ember data is not included by default, but can be installed by simply using ember-cli: `ember install ember-data`.
