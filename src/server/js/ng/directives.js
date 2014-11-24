(function(){
  'use strict';
  
  angular
    .module('app.directives', [])
    .directive('activeLink', activeLink)
    ;

  /* @ngInject */
  function activeLink($rootScope, $location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs, controller) {
        $rootScope.$on('$locationChangeSuccess', function() {
          // If not a link or is missing href, return
          if(!attrs.href || !$(element).is('a')) return;
          
          var isActive = false;
          var css = attrs.activeLinkClass || 'active';
          var loc = ($location.path() || '').toLocaleLowerCase();
          
          if(attrs.href && attrs.href.toLocaleLowerCase() === loc){
            isActive = true;
          }
          else if(attrs.activeLinkAltPaths && attrs.activeLinkAltPaths.length){
            var paths = attrs.activeLinkAltPaths.split(',');
            isActive = _.some(paths, function(path){
              return (path||'').toLocaleLowerCase() === loc;
            });
          }
          
          if(isActive){
            $(element).addClass(css);
          }
          else{
            $(element).removeClass(css);
          }
        }); 
      }
    };
  }
})();