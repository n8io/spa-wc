(function(){
  'use strict';

  /**
   * @ngInject
   */
  function Master_Controller($timeout){
    var vm = this;
    $timeout(function(){
      console.table([
        {
          name: 'taco',
          value: 42
        },
        {
          name: 'enchilada',
          value: 13
        }
      ]);
    },1000);
  }

  /**
   * @ngInject
   */
  function Child_Controller($log){
    var vm = this;

    vm.isLoading = 'Shit yeah';

    $log.log('I logz it.');
  }

  angular
    .module('app')
    .controller('Master_Controller', Master_Controller)
    .controller('Child_Controller', Child_Controller);
})();