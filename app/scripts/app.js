'use strict';

angular.module('of5App', [])
    .constant('XCHGLAB_CONFIG', {API_KEY: 'testkey'})
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl'})
            .when('/plcs', {templateUrl: 'views/plcs.html', controller: 'PlcsCtrl'})
            .when('/plc/:id/edit', {templateUrl: 'views/plc-edit.html', controller: 'PlcEditCtrl'})
            .when('/plc/:id', {templateUrl: 'views/plc-view.html', controller: 'PlcViewCtrl'/*,
                resolve: {
                    plc: function($route, Plc) {
                        console.log($route.current.params.id);
                        Plc.getById($route.current.params.id, function(plc){
                            try {
                                return plc;
                            } catch (_error) {
//                                error = _error;
                                return [];
                            }
                        });
                    }}*/})
            .otherwise({redirectTo: '/'});
    })
    .factory('Plc', function (xchglabResourceHttp) {
        return xchglabResourceHttp('plcs');
    })
    .factory('User', function (xchglabResourceHttp) {
        return xchglabResourceHttp('users');
    })

;
