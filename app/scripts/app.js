'use strict';

angular.module('of5App', ['restangular'])
  .constant('XCHGLAB_CONFIG', {API_KEY: 'testkey'})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/',
      { templateUrl: 'views/main.html', controller: 'MainCtrl'
      })
      .when('/plcs', {templateUrl: 'views/plcs.html', controller: 'PlcsCtrl'})
      .when('/plc/:id/edit', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
      .when('/plc/insert', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
      .when('/plc/:id', {templateUrl: 'views/plc-view.html', controller: 'PlcViewCtrl'})
      .otherwise({redirectTo: '/'});
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common.Authorization = 'Basic admin@orgtec.com:xxxxxx';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//    $httpProvider.defaults.headers.get['Gonto-id'] = 'P';
  }])
  .config(
    ['RestangularProvider',
      function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://exi.xchg.com/api');

        // what's this
        RestangularProvider.setListTypeIsArray(false);

        RestangularProvider.setResponseExtractor(function(response/*, operation, what*/) {
          return response;
//          if (operation === 'get') {
//            return response;
//          } else if (operation === 'getList') {
//            return response;
//          }
        });
      } ])

;
