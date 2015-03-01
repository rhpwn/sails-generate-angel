(function () {
  'use strict';

  var apServices = angular.module('S<%= componentName %>Services', []);
  apServices.factory('<%= componentName %>Services', <%= componentName %>Services);

  <%= componentName %>Services.$inject = ['$http'];
  function <%= componentName %>Services($http) {
    return vm;
  }
})();
