/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
var bower = require('bower');
var fsx = require('fs-extra');
var async = require('async');
var npm = require("npm");

/**
 * Update client-side dependencies
 */


/**
 * sails-generate-angel
 *
 * Usage:
 * `sails generate angel`
 *
 * @description Generates a angel
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    //
    // e.g. if someone runs:
    // $ sails generate angel user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`

    if (!scope.args[0]) {
      return cb( new Error('Please provide a name for this angel.') );
    }

    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }


    // Decide the output filename for use in targets below:
    scope.componentName = scope.args[0];
    cb();
  },

  after: function(scope, cb) {
    cb();
  },

  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }

    // Creates a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).

    './assets/js/components/:componentName': { folder: {} },
    './assets/js/components/:componentName/:componentName.js': { template: 'component/component.js' },
    './assets/js/components/:componentName/:componentName-controller.js': { template: 'component/component-controller.js' },
    './assets/js/components/:componentName/:componentName-service.js': { template: 'component/component-service.js' },
    './assets/js/components/:componentName/templates/:componentName.html': { template: 'component/templates/component.html' },
  },

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, '../templates')
};





/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "angel":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-angel`, please resolve this '+
  'issue and publish a new patch release.';
  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);
  return new Error(message);
}
