#!/usr/bin/env node

var path = require('path');
var sailsgen = require('sails-generate');
var contentDisposition = require('content-disposition');
var pkg = require(path.join(__dirname, '../package.json') );
var program = require('commander');
var _ = require('lodash');
var fs = require('fs');

program
    .version(pkg.version)
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', parseInt)
    .parse(process.argv);

var port = program.port || 3000;


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
  function spliceSlice(str, index, count, add) {
    return str.slice(0, index) + (add || "") + str.slice(index + count);
  }
  function insertAt(src, index, str) {
    return src.substr(0, index) + str + src.substr(index)
  }
  injectComponents = function(cb) {
    fs.readdir('assets/js/components/', function(err, dirs) {
      strDirs = '';
      for(var i in dirs) {
        strDirs += "    '" + dirs[i] + "',\n";
      }
      fs.readFile('assets/js/app.js', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        var result = data;

        injStart = data.indexOf('/**injector:start**/');
        injEnd = data.indexOf('/**injector:end**/');
        var r = spliceSlice(data, injStart + 21, injEnd - injStart - 21 - 4);
        r = insertAt(r, injStart + 21, strDirs);
        fs.writeFile('assets/js/app.js', r, 'utf8', function (err) {
           cb(err);
        });
      });
    });
  }

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
    injectComponents(function(err) {
      if(err) throw err;
      console.log("Created new component", 'index.html/#/' + process.argv[3]);
    });
  });
}

