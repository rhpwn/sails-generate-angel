(function () {
  'use strict';

  var app = angular.module('home', ['home-controller']);

  app.config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'assets/js/components/home/templates/home.html',
      });
  });

})();
