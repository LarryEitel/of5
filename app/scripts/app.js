'use strict';

angular.module('of5App', ['ModelCore'])
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
  .factory('Plc', function (xchglabResourceHttp) {

    var Plc = xchglabResourceHttp('plcs');

    Plc.$put = function (data) {
      console.log(data);
//    Plc.$put = function (data, successcb, errorcb) {
//
//      console.log('$put', this.etag);
//      console.log('tkn', this.tkn);
    };

    return Plc;
  })


  .factory('Plcs', function (ModelCore) {
    return ModelCore.instance({
      $type: 'Plcs',
      $pkField: '_id',
      $settings: {
        dataField: {
          many: '_items'
        },
        urls: {
          base: 'http://exi.xchg.com/api/plcs'
        }
      },
      $myCustomAction: function (aaa) {
        console.log(aaa, this);
      }
    });
  })

  .factory('User', function (xchglabResourceHttp) {
    return xchglabResourceHttp('users');
  })

;
