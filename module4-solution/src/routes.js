(function () {

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })

      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/main-categories.template.html',
        controller: 'CategoriesController as categoriesController',
        resolve:{
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/categories/items/{categoryId}',
        templateUrl: 'src/menuapp/templates/main-items.template.html',
        controller: "ItemsController as itemsController",
        resolve:{
          items: ['$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryId);
          }],
          categoryCode: ['$stateParams', function ($stateParams) {
              return $stateParams.categoryId;
          }]
        }
      });
  }

})();