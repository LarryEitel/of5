'use strict';

angular.module('of5App', ['restangular'])
  .constant('XCHGLAB_CONFIG', {API_KEY: 'testkey'})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/',
      { templateUrl: 'views/main.html', controller: 'MainCtrl'
      })
      .when('/plcs', {templateUrl: 'views/plcs.html', controller: 'PlcsCtrl'})
      .when('/plc/:id/edit', {templateUrl: 'views/plc-edit.html', controller: 'PlcEditCtrl'})
      .when('/plc/:id', {templateUrl: 'views/plc-view.html', controller: 'PlcViewCtrl'})
      .otherwise({redirectTo: '/'});
  })
  .config(
    ['RestangularProvider',
      function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://exi.xchg.com/api');
        RestangularProvider.setListTypeIsArray(false);

        RestangularProvider.setResponseExtractor(function(response, operation/*, what*/) {
          if (operation === 'get') {
            return response;
          } else if (operation === 'getList') {
            return response;
          }
        });
      } ])
;
