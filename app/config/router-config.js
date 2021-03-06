'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/join#signup');
  $urlRouterProvider.when('/', '/join#signup');
  $urlRouterProvider.when('/customer', '/create-account#login');
  $urlRouterProvider.when('/signup', '/join#signup');
  $urlRouterProvider.when('/login', '/join#login');

  let states = [
    {
      name: 'shopping',
      url: '/shopping',
      template: require('../view/shopping/shopping.html'),
      controller: 'ShoppingController',
      controllerAs: 'shoppingCtrl'
    },
    {
      name: 'cart',
      url: '/cart',
      template: require('../view/cart/cart.html'),
      controller: 'CartController',
      controllerAs: 'cartCtrl'
    },
    {
      name: 'settings',
      url: '/settings',
      template: require('../view/settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'settingsCtrl'
    },
    {
      name: 'employee-landing',
      url: '/join',
      template: require('../view/employee-landing/employee-landing.html'),
      controller: 'EmployeeLandingController',
      controllerAs: 'employeelandingCtrl'
    },
    {
      name: 'customer-landing',
      url: '/create-account',
      template: require('../view/customer-landing/customer-landing.html'),
      controller: 'CustomerLandingController',
      controllerAs: 'customerLandingCtrl'
    },
    {
      name: 'employee-dashboard',
      url: '/employee',
      template: require('../view/employee-dashboard/employee-dashboard.html'),
      controller: 'EmployeeDashboardController',
      controllerAs: 'employeeDashboardCtrl'
    },
    {
      name: 'customer-dashboard',
      url: '/customer-dashboard',
      template: require('../view/customer-dashboard/customer-dashboard.html'),
      controller: 'CustomerDashboardController',
      controllerAs: 'customerDashboardCtrl'
    },
    {
      name: 'inventory',
      url: '/inventory',
      template: require('../view/inventory/inventory.html'),
      controller: 'InventoryController',
      controllerAs: 'inventoryCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
