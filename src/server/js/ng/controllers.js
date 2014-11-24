(function(){
  'use strict';

  angular
    .module('app')
    .controller('Master_Controller', Master_Controller)
    ;

  /* @ngInject */
  function Master_Controller($log){
    $log.log('Master_Controller loaded.');
  }
})();