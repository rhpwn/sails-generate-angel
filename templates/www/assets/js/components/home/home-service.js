(function () {
  'use strict';

  var apServices = angular.module('ShomeServices', []);
  apServices.factory('homeServices', homeServices);

  homeServices.$inject = ['$http'];
  function homeServices($http) {
    return vm;
  }

})();
