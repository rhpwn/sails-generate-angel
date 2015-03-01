(function () {
  'use strict';

  var app = angular.module('<%= appName %>App', [
    'ui.router',
    /**injector:start**/
    'home',
    /**injector:end**/
  ]);

  app.config(['$urlRouterProvider', '$stateProvider',
    function ($urlRouterProvider, $stateProvider) {

      $urlRouterProvider.otherwise('/home');

    }]);

})();
