(function () {
  'use strict';
  var app = angular.module('home-controller', []);
  app.controller('homeController', homeController);

  homeController.$inject = ['$http'];
  function homeController($http) {
    var vm = this;
  };

})();



