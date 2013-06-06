"use strict"
angular.module "ofApp", ["restangular", "ngCookies", "ui.bootstrap", "google-maps"]

# angular.module('ofApp').constant('XCHGLAB_CONFIG', {API_KEY: 'testkey'});
#angular.module('ofApp').config(function ($routeProvider) {
#     $routeProvider
#       .when('/',
#       { templateUrl: 'views/main.html', controller: 'MainCtrl'
#       })
#       .when('/plcs', {templateUrl: 'views/plcs.html', controller: 'PlcsCtrl'})
#       .when('/plc/:id/edit', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
#       .when('/plc/insert', {templateUrl: 'views/plc-form.html', controller: 'PlcFormCtrl'})
#       .when('/plc/:id', {templateUrl: 'views/plc-view.html', controller: 'PlcViewCtrl'})
#       .otherwise({redirectTo: '/'});
#   });
angular.module("ofApp").config ["$httpProvider", ($httpProvider) ->
  $httpProvider.defaults.headers.common.Authorization = "Basic admin@orgtec.com:xxxxxx"
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"
]
angular.module("ofApp").config ["RestangularProvider", (RestangularProvider) ->
  RestangularProvider.setBaseUrl "http://exi.xchg.com/api"

  # RestangularProvider.setBaseUrl('http://localhost:5000/api');

  # what's this
  RestangularProvider.setListTypeIsArray false

  #        RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
  #          if (operation === 'put') {
  #            element.actions = '{"$set":{"flds":{"lbl":"Larry"}}}';
  #            delete element.id;
  #          }
  #
  #          return element;
  #        });
  RestangularProvider.setResponseExtractor (response, operation, what) ->
    localStorage.setItem "lsuser", JSON.stringify(response._items[0])  if what is "users" and operation is "getList"
    response

]

#          if (operation === 'get') {
#            return response;
#          } else if (operation === 'getList') {
#            return response;
#          }
angular.module("ofApp").config ["$routeProvider", "$locationProvider", "$httpProvider", ($routeProvider, $locationProvider, $httpProvider) ->
  access = routingConfig.accessLevels
  $routeProvider.when "/plcs",
    templateUrl: "views/plcs.html"
    controller: "PlcsCtrl"
    access: access.anon

  $routeProvider.when "/plc/:id/edit",
    templateUrl: "views/plc-form.html"
    controller: "PlcFormCtrl"
    access: access.anon

  $routeProvider.when "/plc/insert",
    templateUrl: "views/plc-form.html"
    controller: "PlcFormCtrl"
    access: access.anon

  $routeProvider.when "/plc/:id",
    templateUrl: "views/plc-view.html"
    controller: "PlcViewCtrl"
    access: access.anon

  $routeProvider.when "/",
    templateUrl: "views/partials/home.html"
    controller: "HomeCtrl"
    access: access.user

  $routeProvider.when "/login",
    templateUrl: "views/partials/login.html"
    controller: "LoginCtrl"
    access: access.anon

  $routeProvider.when "/logout",
    templateUrl: "views/partials/logout.html"
    controller: "LogoutCtrl"
    access: access.user

  $routeProvider.when "/register",
    templateUrl: "views/partials/register.html"
    controller: "RegisterCtrl"
    access: access.anon

  $routeProvider.when "/private",
    templateUrl: "/partials/private"
    controller: "PrivateCtrl"
    access: access.user

  $routeProvider.when "/admin",
    templateUrl: "/partials/admin"
    controller: "AdminCtrl"
    access: access.admin

  $routeProvider.when "/404",
    templateUrl: "views/partials/404.html"
    access: access.public

  $routeProvider.otherwise redirectTo: "/404"

  #    $locationProvider.html5Mode(true);
  interceptor = ["$location", "$q", ($location, $q) ->
    success = (response) ->
      response
    error = (response) ->
      if response.status is 401
        $location.path "/login"
        $q.reject response
      else
        $q.reject response
    (promise) ->
      promise.then success, error
  ]
  $httpProvider.responseInterceptors.push interceptor
]
angular.module("ofApp").run ["$rootScope", "$location", "Auth", ($rootScope, $location, Auth) ->
  $rootScope.$on "$routeChangeStart", (event, next, current) ->
    $rootScope.error = null

    #          console.log($location.$$url);
    #          $location.path($location.$$url);
    #        } else {
    $location.path "/login"  unless Auth.isLoggedIn()  unless Auth.authorize(next.access)

  $rootScope.appInitialized = true
]
