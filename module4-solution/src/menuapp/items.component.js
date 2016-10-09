(function () {
  'use strict';

  angular.module('MenuApp')
  .component('itemsList', {
    templateUrl: 'src/menuapp/templates/items.template.html',
    bindings: {
      items: '<'
    }
  });

})();