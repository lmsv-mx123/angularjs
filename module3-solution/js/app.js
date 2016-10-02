(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('ApiBaseUrl', "https://davids-restaurant.herokuapp.com/")
    .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective () {
        var ddo = {
			restrict: 'E',
			templateUrl: 'foundItem.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }
	
    function FoundItemsDirectiveController() {
        var list = this;
        list.isEmpty = function() {
            return (list.items !== undefined && list.items.length < 1);
        };
		list.hasItems = function() {
			return (list.items !== undefined && list.items.length >= 1);
		}
		list.pluralize = function(count, name) {
			if(count === 1) {
				return count + ' ' + name;
			}
			else {
				return count + ' ' + name + 's';
			}
		}
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var narrowItCtrl = this;
        narrowItCtrl.searchTerm = '';

        narrowItCtrl.search = function (searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
			.then(function (response) {
                narrowItCtrl.found = response;
            })
            .catch(function (error){
                console.log('Something went wrong.' + error);
            });
        };

        narrowItCtrl.removeItem = function (itemIndex) {
            narrowItCtrl.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBaseUrl'];
    function MenuSearchService($http, ApiBaseUrl) {
        var menuServ = this;

        menuServ.getMatchedMenuItems = function (searchTerm) {
            return $http(
                {
                    method: "GET",
                    url: (ApiBaseUrl + "menu_items.json")
                }
            ).then(function (result) {
                var foundItems = [];
				// searchTerm already trimmed by angular
                if(searchTerm != "") {
			        var menuItems = result.data.menu_items;
                    if (menuItems !== null && menuItems.length > 0) {
                        for (var i = 0; i < menuItems.length; i++) {
                            if(menuItems[i].description.toLowerCase().includes(searchTerm.toLowerCase()))
                                foundItems.push(menuItems[i]);
                        }
                    }
				}
				return foundItems;				
            }).catch(function (error) {
				console.log('Error at the service. ' + error);
			});
        };
    }
})();