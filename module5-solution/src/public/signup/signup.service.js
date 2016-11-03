(function () {
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

SignUpService.$inject = ['$http', 'ApiPath'];
function SignUpService($http, ApiPath) {
  var service = this;

  //store the user preferences, that will be used on get preferences
  service.setUserPreferences = function(userSignUpPreferences){
    service.userSignUpPreferences = userSignUpPreferences;
  };

  service.getUserPreferences = function(){
    return service.userSignUpPreferences;
  };
}

})();
