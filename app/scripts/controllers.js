'use strict';

/* Controllers */

angular.module('ofApp')
  .controller('AppCtrl',
    ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {

      $scope.getUserRoleText = function (role) {
        return _.invert(Auth.userRoles)[role];
      };


      $scope.logout = function () {
        Auth.logout(function () {
          $location.path('/login');
        }, function () {
          $rootScope.error = 'Failed to logout';
        });
      };
    }]);

angular.module('ofApp')
  .controller('LoginCtrl',
    ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
      $rootScope.activeNavItem = 'login';
      $scope.rememberme = true;


      $scope.login = function () {
        localStorage.removeItem('lsuser');
        Auth.login({
            username: $scope.username,
            password: $scope.password,
            rememberme: $scope.rememberme
          },
          function (res) {
            $location.path('/');
          },
          function (err) {
            $rootScope.error = 'Failed to login';
          });
      };
    }]);

angular.module('ofApp')
  .controller('LogoutCtrl',
    ['$rootScope', '$location', function ($rootScope, $location) {
      localStorage.removeItem('lsuser');
      delete $rootScope.user;
      $location.path('/');
    }]);

angular.module('ofApp')
  .controller('HomeCtrl',
    ['$rootScope', function ($rootScope) {

      $rootScope.activeNavItem = 'home';

    }]);

angular.module('ofApp')
  .controller('RegisterCtrl',
    ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
      $rootScope.activeNavItem = 'register';
      $scope.role = routingConfig.userRoles.user;

      $scope.register = function () {
        Auth.register({
            username: $scope.username,
            password: $scope.password,
            role: $scope.role
          },
          function (res) {
            $rootScope.user = res;
            $location.path('/');
          },
          function (err) {
            $rootScope.error = err;
          });
      };
    }]);

angular.module('ofApp')
  .controller('PrivateCtrl',
    ['$rootScope', function ($rootScope) {

      $rootScope.activeNavItem = 'private';

    }]);


angular.module('ofApp')
  .controller('AdminCtrl',
    ['$rootScope', '$scope', 'Users', function ($rootScope, $scope, Users) {

      $rootScope.activeNavItem = 'admin';
      $scope.loading = true;

      Users.getAll(function (res) {
        $scope.users = res;
        $scope.loading = false;
      }, function (err) {
        $rootScope.error = 'Failed to fetch users.';
        $scope.loading = false;
      });

    }]);

