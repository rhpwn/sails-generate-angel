(function () {
  'use strict';
  var app = angular.module('<%= componentName %>-controller', []);
  app.controller('<%= componentName %>Controller', <%= componentName %>Controller);

  <%= componentName %>Controller.$inject = ['$http'];
  function <%= componentName %>Controller($http) {
    var vm = this;
  };

})();



