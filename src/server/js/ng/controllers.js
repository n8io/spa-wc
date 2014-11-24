(function(){
  'use strict';

  angular
    .module('app')
    .controller('Master_Controller', Master_Controller)
    .controller('Child_Controller', Child_Controller);

  /* @ngInject */
  function Master_Controller($log){
    $log.log('Master_Controller loaded.');
  }

  /* @ngInject */
  function Child_Controller($log){
    $log.log('I logz it.');
  }
})();