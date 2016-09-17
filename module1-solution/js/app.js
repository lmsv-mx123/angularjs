(function(){
  'use strict';

  angular.module('LunchChecker', [])
  .controller('LunchCheckerController', function($scope){

    $scope.input_list = "";
    $scope.message = "";
    $scope.result = "";

    $scope.Calculate = function(){
        var list = $scope.input_list;
        // ng-model already performed the trimming
		if(list == ""){
          $scope.message = "Please enter data first!";
          $scope.result = "error";
        } else{
          var list_arr = list.split(",").map((item) => item.trim());
          if(list_arr.filter(String).length <=3){
            $scope.message = "Enjoy!";
            $scope.result = "success";
          }else{
            $scope.message = "Too Much!";
            $scope.result = "success";
          }
        }
    };

  });

})();
