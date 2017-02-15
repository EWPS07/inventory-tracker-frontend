'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/join#signup');
  $urlRouterProvider.when('/', '/join#signup');
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
      name: 'settings',
      url: '/settings',
      template: require('../view/settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'settingsCtrl'
    },
    {
      name: 'employee-dashboard',
      url: '/employee-dashboard',
      template: require('../view/employee-dashboard/employee-dashboard.html'),
      controller: 'EmployeeDashboardController',
      controllerAs: 'EmployeeDashboardCtrl'
    },
    // {
    //   name: 'customer-dashboard',
    //   url: '/customer-dashboard',
    //   template: require('../view/customer-dashboard/customer-dashboard.html'),
    //   controller: 'CustomerDashboardController',
    //   controllerAs: 'CustomerDashboardCtrl'
    // }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
