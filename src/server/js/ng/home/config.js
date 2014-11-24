(function(){
  'use strict';
  
  angular
    .module('app')
    .config(routeConfiguration);

  /* @ngInject */
  function routeConfiguration($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'a',
        controller: 'Partials_A_Controller',
        controllerAs: 'pc'
      })
      .when('/a', {
        templateUrl: 'a',
        controller: 'Partials_A_Controller',
        controllerAs: 'pc'
      })
      .when('/b', {
        templateUrl: 'b',
        controller: 'Partials_B_Controller',
        controllerAs: 'pc'
      })
      .when('/c', {
        templateUrl: 'c',
        controller: 'Partials_C_Controller',
        controllerAs: 'pc'
      })
      .otherwise({
        redirectTo: '/'
      });
      
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: true
	  });
  }
})();