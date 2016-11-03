(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['SignUpService','MenuService'];
function SignUpController(SignUpService, MenuService) {
  var $ctrl = this;
  
  $ctrl.invalidMenuItem = false;
  $ctrl.showMessage = false;

  //information of the user
  $ctrl.userInfo = {};

  $ctrl.signUpUser = function(){
    var menuItem = $ctrl.userInfo.menuItem;
    var promise = MenuService.getMenuItem(menuItem)
    .then(function(response){
      $ctrl.userInfo.userPreference = response;
    });

    //save the user preferences
    SignUpService.setUserPreferences($ctrl.userInfo);
    $ctrl.showMessage = true;
  };

  //Method to check that a menu item exists.
  $ctrl.checkMenuItem = function(){
    var menuItem = $ctrl.userInfo.menuItem;

    if(menuItem !== undefined && menuItem != ''){

      var promise = MenuService.getMenuItem(menuItem)
      .then(function(response){
        $ctrl.invalidMenuItem = false;
        return response;
      })
      .catch(function(error){
        $ctrl.invalidMenuItem = true;
      });
    }
  }
}

})();
