(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items','categoryCode'];
  function ItemsController(items,categoryCode) {
    var itemsController = this;

    itemsController.categoryCode = categoryCode;
    itemsController.items = items.menu_items;
  }

})();