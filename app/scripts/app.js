'use strict';

angular.module('ofApp', ['restangular','ui.bootstrap', 'ui'])
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
  }])
  .config(
    ['RestangularProvider',
      function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://exi.xchg.com/api');
//        RestangularProvider.setBaseUrl('http://localhost:5000/api');

        // what's this
        RestangularProvider.setListTypeIsArray(false);

//        RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
//          if (operation === 'put') {
//            element.actions = '{"$set":{"flds":{"lbl":"Larry"}}}';
//            delete element.id;
//          }
//
//          return element;
//        });

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
