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
    }
  ];

  states.forEach( state => {
    $stateProvider.state(state);
  });
}
