'use strict';

angular.module('ofApp',
  ['restangular',
  'ngCookies',
  'ui.bootstrap',
  'google-maps']);


// angular.module('ofApp').constant('XCHGLAB_CONFIG', {API_KEY: 'testkey'});
//angular.module('ofApp').config(function ($routeProvider) {
//     $routeProvider
//       .when('/',
//       { templateUrl: 'views/main.html', controller: 'MainCtrl'
//       })
//       .when('/plcs', {templateUrl: 'views/plcs.html', controller: 'PlcsCtrl'})
//       .when('/plc/:id/edit', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
//       .when('/plc/insert', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
//       .when('/plc/:id', {templateUrl: 'views/plc-view.html', controller: 'PlcViewCtrl'})
//       .otherwise({redirectTo: '/'});
//   });
angular.module('ofApp').config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.headers.common.Authorization = 'Basic admin@orgtec.com:xxxxxx';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }]);
angular.module('ofApp').config(
    ['RestangularProvider',
      function(RestangularProvider) {
        RestangularProvider.setBaseUrl('http://exi.xchg.com/api');
        // RestangularProvider.setBaseUrl('http://localhost:5000/api');

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

        RestangularProvider.setResponseExtractor(function(response, operation, what) {
          if (what === 'users' && operation === 'getList') {
            localStorage.setItem('lsuser', JSON.stringify(response._items[0]));
          }
          return response;
          //          if (operation === 'get') {
          //            return response;
          //          } else if (operation === 'getList') {
          //            return response;
          //          }
        });
      }]);
angular.module('ofApp').config(['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $routeProvider.when('/plcs', {
      templateUrl: 'views/plcs.html',
      controller: 'PlcsCtrl',
      access: access.anon
    });

    $routeProvider.when('/plc/:id/edit', {
      templateUrl: 'views/plc-form.html',
      controller: 'PlcFormCtrl',
      access: access.anon
    });

    $routeProvider.when('/plc/insert', {
      templateUrl: 'views/plc-form.html',
      controller: 'PlcFormCtrl',
      access: access.anon
    });

    $routeProvider.when('/plc/:id', {
      templateUrl: 'views/plc-view.html',
      controller: 'PlcViewCtrl',
      access: access.anon
    });

    $routeProvider.when('/',
      {
        templateUrl:    'views/partials/home.html',
        controller:     'HomeCtrl',
        access:         access.user
      });
    $routeProvider.when('/login',
      {
        templateUrl:    'views/partials/login.html',
        controller:     'LoginCtrl',
        access:         access.anon
      });
    $routeProvider.when('/logout',
      {
        templateUrl:    'views/partials/logout.html',
        controller:     'LogoutCtrl',
        access:         access.user
      });
    $routeProvider.when('/register',
      {
        templateUrl:    'views/partials/register.html',
        controller:     'RegisterCtrl',
        access:         access.anon
      });
    $routeProvider.when('/private',
      {
        templateUrl:    '/partials/private',
        controller:     'PrivateCtrl',
        access:         access.user
      });
    $routeProvider.when('/admin',
      {
        templateUrl:    '/partials/admin',
        controller:     'AdminCtrl',
        access:         access.admin
      });
    $routeProvider.when('/404',
      {
        templateUrl:    'views/partials/404.html',
        access:         access.public
      });
    $routeProvider.otherwise({redirectTo:'/404'});

//    $locationProvider.html5Mode(true);

    var interceptor = ['$location', '$q', function($location, $q) {
      function success(response) {
        return response;
      }

      function error(response) {

        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

      return function(promise) {
        return promise.then(success, error);
      };
    }];

    $httpProvider.responseInterceptors.push(interceptor);

  }]);

angular.module('ofApp').run(['$rootScope', '$location', 'Auth',
  function ($rootScope, $location, Auth) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      $rootScope.error = null;
      if (!Auth.authorize(next.access)) {
        if (!Auth.isLoggedIn()) {
//          console.log($location.$$url);
//          $location.path($location.$$url);
//        } else {
          $location.path('/login');
        }
      }
    });

    $rootScope.appInitialized = true;
  }]);
