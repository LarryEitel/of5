"use strict"
angular.module("ofApp").factory "Auth", (Restangular, $http, $rootScope, $cookieStore) ->
    accessLevels = routingConfig.accessLevels
    userRoles = routingConfig.userRoles
    $rootScope.user = JSON.parse(localStorage.getItem("lsuser"))  if localStorage.getItem("lsuser")

    #    $rootScope.user = $cookieStore.get('user') || { username: '', role: userRoles.public };
    #    $rootScope.user = localStorage.user;
    #    $cookieStore.remove('user');
    #    localStorage.removeItem('lsuser');
    $rootScope.accessLevels = accessLevels
    $rootScope.userRoles = userRoles
    authorize: (accessLevel, role) ->
        return true  if role isnt `undefined`
        false


    #          role = $rootScope.user.role;
    #//        return accessLevel & role;
    isLoggedIn: (user) ->
        if user is `undefined`
            user = $rootScope.user
            user

    register: (user, success, error) ->
        $http.post("/register", user).success(success).error error

    login: (user, success, error) ->
        Users = Restangular.all("users")
        Users.getList(where: JSON.stringify(uNam: user.username)).then ((items) ->
            if items._items.length
                user = items._items[0]
                $rootScope.user = user

                #              console.log('then.user', user);
                success user
        ), ((res) ->
            $location.path "/"
        ), (err) ->
            $rootScope.error = "Failed to login"


    logout: (success, error) ->

        #          $rootScope.user.role = userRoles.public;
        $http.post("/logout").success(->
            $rootScope.user.uNam = ""
            success()
        ).error error

    accessLevels: accessLevels
    userRoles: userRoles


# angular.module('ofApp')
#   .factory('Users', function ($http) {
#     return {
#       getAll: function (success, error) {
#         $http.get('/users').success(success).error(error);
#       }
#     };
#   });
