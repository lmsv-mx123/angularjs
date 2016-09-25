(function() {
  'use strict';

  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyShoppingController", ToBuyShoppingController)
  .controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOff);

  ToBuyShoppingController.$inject = ["ShoppingListCheckOffService"];
  AlreadyBoughtShoppingController.$inject = ["ShoppingListCheckOffService"];

  function  ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.buyList = ShoppingListCheckOffService.toBuyList;

    toBuy.bought = function(itemIndex) {
      ShoppingListCheckOffService.itemBought(itemIndex);
    };
  };
  
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
    var alreadyBought = this;

    alreadyBought.boughtList = ShoppingListCheckOffService.alreadyBoughtList;
  };
  
  function ShoppingListCheckOff() {
    var service = this;

    service.toBuyList = [ {name:"pizza", quantity:1},
                         {name:"potatoes", quantity:10},
                         {name:"bottles of soda", quantity:3},
                         {name:"bag of chips", quantity:1},
                         {name:"plastic cups", quantity:15 }
                       ];
    service.alreadyBoughtList = [];

    service.itemBought = function(itemIndex) {
      service.alreadyBoughtList.push(service.toBuyList[itemIndex]);
      service.toBuyList.splice(itemIndex,1);
    };
  };
})();