(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBaseUrl', "https://davids-restaurant.herokuapp.com/");

  MenuDataService.$inject = ['$http', 'ApiBaseUrl']
  function MenuDataService($http, ApiBaseUrl) {
    var service = this;

    service.getAllCategories = function () {
    return $http(
	{
      method: "GET",
      url: (ApiBaseUrl + "categories.json")
    }
	).then(function (result) {
	  return result.data
	}).catch(function (error) {
	  console.log('Error at the service. ' + error);
	});

  };

  service.getItemsForCategory = function (categoryShortName) {
      return $http(
	  {
        method: "GET",
        url: (ApiBaseUrl + "menu_items.json"),
        params: {
          category: categoryShortName
        }
      }
	  ).then(function (result) {
	    return result.data
	  }).catch(function (error) {
	    console.log('Error at the service. ' + error);
	  });

  };
}

})();