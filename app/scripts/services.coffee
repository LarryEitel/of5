'use strict'
angular.module('ofApp').factory 'Auth', (Restangular, $http, $rootScope, $location, $cookieStore) ->
    accessLevels = routingConfig.accessLevels
    userRoles = routingConfig.userRoles
    $rootScope.tkn = $cookieStore.get("tkn") or ""
    $rootScope.user = $cookieStore.get("user") or
        uNam: ""
        email: ""
        tkn: ""
        role: 6
    console.log 'Auth', $rootScope.user

#    $cookieStore.remove "user"

    $rootScope.accessLevels = accessLevels
    $rootScope.userRoles = userRoles

    authorize: (accessLevel, role) ->
        role = $rootScope.user.role if typeof(role) is 'undefined'
        accessLevel & role

    isLoggedIn: (user) ->
        user = $rootScope.user if typeof(user) is 'undefined'
        user.role is userRoles.user or user.role is userRoles.admin
        console.log 'isLoggedIn', user
        return user.role

    register: (user, success, error) ->
        $http.post('/register', user).success(success).error error

    login: (user, success, error) ->
#        user = {uNamOrEmail: user.uNamOrEmail, pw:user.pw}
#        user = {uNamOrEmail: "admin", pw:"admin"}
#        user = {uNamOrEmail: "admin@xchg.com", pw:"admin"}
        data = 'doc=' + JSON.stringify({uNamOrEmail: "admin@xchg.com", pw:"admin"})
        $http(
            method: 'POST'
            url: 'http://localhost:5000/api/users/_/login'
            data: data
            headers:
                'Content-Type': 'application/x-www-form-urlencoded'
        ).success((response) ->
            console.log 'login success'
            u = response.user
            $rootScope.tkn = u.tkn
            u.role = 'admin'
            $cookieStore.put('user', u)
            $cookieStore.put('tkn', u.tkn)
            $rootScope.user = u
            success u
        ).error (response) ->
            console.log response or "Request failed"

    logout: (success, error) ->
        #          $rootScope.user.role = userRoles.public;
        $http.post('/logout').success(->
            console.log 'logout'
            $rootScope.user.uNam = ""
            $rootScope.user.role = userRoles.public
            $location.path '/'
            success()
        ).error error

    accessLevels: accessLevels
    userRoles: userRoles
