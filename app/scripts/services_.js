'use strict';

angular.module('ofApp')
  .factory('Auth', function (Restangular, $http, $rootScope, $cookieStore) {

    var accessLevels = routingConfig.accessLevels
      , userRoles = routingConfig.userRoles;

    if (localStorage.getItem('lsuser')) {
      $rootScope.user = JSON.parse(localStorage.getItem('lsuser'));
    }

//    $rootScope.user = $cookieStore.get('user') || { username: '', role: userRoles.public };
//    $rootScope.user = localStorage.user;
//    $cookieStore.remove('user');
//    localStorage.removeItem('lsuser');

    $rootScope.accessLevels = accessLevels;
    $rootScope.userRoles = userRoles;

    return {
      authorize: function (accessLevel, role) {
        if (role !== undefined) {
          return true;
        }
        return false;
//          role = $rootScope.user.role;
////        return accessLevel & role;
      },
      isLoggedIn: function (user) {
        if (user === undefined) {
          user = $rootScope.user;
          return user;
        }
      },
      register: function (user, success, error) {
        $http.post('/register', user).success(success).error(error);
      },

      login: function (user, success, error) {
        var Users = Restangular.all('users');

        Users.getList({where: JSON.stringify({uNam: user.username})})
          .then(function (items) {
            if (items._items.length) {
              user = items._items[0];
              $rootScope.user = user;
//              console.log('then.user', user);
              success(user);
            }

          },
          function (res) {
            $location.path('/');
          },
          function (err) {
            $rootScope.error = 'Failed to login';
          });
      },
      logout: function (success, error) {
        $http.post('/logout').success(function () {
          $rootScope.user.uNam = '';
//          $rootScope.user.role = userRoles.public;
          success();
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles
    };
  });

// angular.module('ofApp')
//   .factory('Users', function ($http) {
//     return {
//       getAll: function (success, error) {
//         $http.get('/users').success(success).error(error);
//       }
//     };
//   });
