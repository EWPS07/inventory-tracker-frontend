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
      controllerAs: 'EmployeeDashboardCtrl'
    },
    {
      name: 'customer-dashboard',
      url: '/customer-dashboard',
      template: require('../view/customer-dashboard/customer-dashboard.html'),
      controller: 'CustomerDashboardController',
      controllerAs: 'CustomerDashboardCtrl'
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
