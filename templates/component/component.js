(function () {
  'use strict';

  var app = angular.module('<%= componentName %>', ['<%= componentName %>-controller']);

  app.config(function($stateProvider) {
    $stateProvider
      .state('<%= componentName %>', {
        url: '/<%= componentName %>',
        templateUrl: 'assets/js/components/<%= componentName %>/templates/<%= componentName %>.html',
      });
  });

})();
