#!/usr/bin/env node

var path = require('path');
var sailsgen = require('sails-generate');
var contentDisposition = require('content-disposition');
var pkg = require(path.join(__dirname, '../package.json') );
//var program = require('commander');
var _ = require('lodash');
var fs = require('fs');


var spliceSlice = function(str, index, count, add) {
  return str.slice(0, index) + (add || "") + str.slice(index + count);
}
var insertAt = function(src, index, str) {
  return src.substr(0, index) + str + src.substr(index)
}

var injectComponents = function(path, cb) {

  if(path != false) {
    path = path + "/";
  }
  else {
    path = '';
  }

  fs.readdir(path + 'assets/js/components/', function(err, dirs) {
    if(err) {
      return console.log(err);
    }
    strDirs = '';
    for(var i in dirs) {
      strDirs += "    '" + dirs[i] + "',\n";
    }
    fs.readFile(path + 'assets/js/app.js', 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      var result = data;

      injStart = data.indexOf('/**injector:start**/');
      injEnd = data.indexOf('/**injector:end**/');
      var r = spliceSlice(data, injStart + 21, injEnd - injStart - 21 - 4);
      r = insertAt(r, injStart + 21, strDirs);
      fs.writeFile(path + 'assets/js/app.js', r, 'utf8', function (err) {
         cb(err);
      });
    });
  });
}


//
// This script exists so we can run our generator
// directly from the command-line for convenience
// during development.
//

if(process.argv[2] == 'new') {
  var rp = require.resolve('sails');
  rp = rp.split("/");
  rp.splice(-2, 2);
  var sailsRoot = rp.join("/");
  var rootPath = process.cwd();
  var package = require(sailsRoot + '/package.json');
  var rconf = require(sailsRoot + '/lib/app/configuration/rc');

  var scope = {
    sailsPackageJSON: package,
    generatorType: 'angel',
    rootPath: rootPath,
    sailsRoot: sailsRoot,
    modules: {
      'angel': path.resolve(__dirname, '../lib/SailsGenerator.js')
    },
    // For the NEW generator we're generating:
    generatorName: process.argv[3],
    args: [
      process.argv[3]
    ],
    generators: {
      modules: {
        angel: path.resolve(__dirname, '../lib/SailsGenerator.js')
      }
    },
   _: [ 'generate', 'angel', process.argv[3] ],
   viewEngine: rconf.viewEngine
  };


  if (!scope.viewEngine && rconf.template) {
    scope.viewEngine = rconf.template;
  }
  _.merge(scope, rconf.generators);
  _.merge(scope, rconf);


  sailsgen(scope, function (err) {
    if (err) throw err;
    console.log('Done!');
  });
}


if(process.argv[2] == 'component') {
  var scope = {
    generatorType: 'angel',
    rootPath: process.cwd(),
    modules: {
      'angel': path.resolve(__dirname, '../lib/ComponentGenerator.js')
    },
    args: [
      process.argv[3]
    ],
  };
  sailsgen(scope, function (err) {
    if (err) throw err;
    injectComponents(false, function(err) {
      if(err) throw err;
      console.log("Created new component", 'index.html/#/' + process.argv[3]);
    });
  });
}


if(process.argv[2] == 'frontend' && process.argv[3]) {
  var scope = {
    generatorType: 'angel',
    rootPath: process.cwd(),
    modules: {
      'angel': path.resolve(__dirname, '../lib/FrontendGenerator.js')
    },
    args: [
      process.argv[3]
    ],
  };
  sailsgen(scope, function (err) {
    if (err) throw err;
    injectComponents(process.argv[3], function(err) {
      if(err) throw err;
      console.log("Created new frotend at", process.argv[3]);
    });
  });
}
