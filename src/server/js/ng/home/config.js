(function(){
  'use strict';
  
  angular
    .module('app')
    .config(routeConfiguration);

  /* @ngInject */
  function routeConfiguration($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'a'
      })
      .when('/a', {
        templateUrl: 'a'
      })
      .when('/b', {
        templateUrl: 'b'
      })
      .when('/c', {
        templateUrl: 'c'
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