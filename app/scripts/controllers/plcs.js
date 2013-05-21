'use strict';

angular.module('of5App')
    .controller('PlcsCtrl', ['$scope', '$location', '$routeParams', 'Plc', function ($scope, $location, $routeParams, Plc) {

//        try {
//            $scope.plcs = plcs['_items'];
//        } catch (_error) {
//            error = _error;
//            $scope.plcs = [];
//        }


        $scope.init = function () {
            Plc.query({}, {max_results: 5}, function(plcs){
                $scope.plcs = plcs;

                try {
                    $scope.plcs = plcs['_items'];
                } catch (_error) {
                    error = _error;
                    $scope.plcs = [];
                }
            });
        };

        $scope.init();




        $scope.edit = function(plc) {
            return $location.path("/plc/" + plc._id + "/edit");
        };
        $scope.view = function(plc) {
            return $location.path("/plc/" + plc._id);
        };
    }])

//    .controller('PlcViewCtrl', ['$scope', '$routeParams', 'Plc', 'User', 'plc', function ($scope, $routeParams, Plc, User, plc) {
    .controller('PlcViewCtrl', ['$scope', '$routeParams', 'Plc', 'User', function ($scope, $routeParams, Plc, User) {
//        $scope.plc = plc


        $scope.init = function () {
            Plc.getById($routeParams.id, function(plc){
                $scope.plc = plc;
                $scope.lat = plc.pts[0];
                $scope.lng = plc.pts[1];
            });
        };

        $scope.init();


    }])

    .controller('PlcEditCtrl', ['$scope', '$location', '$routeParams', 'Plc', 'User',
            function ($scope, $location, $routeParams, Plc, User) {

        var changeError, changeSuccess, plcCopy;

        $scope.init = function () {
            Plc.getById($routeParams.id, function(plc){
                plcCopy = angular.copy(plc);
                $scope.plc = plc;
                $scope.lat = plc.pts[0];
                $scope.lng = plc.pts[1];
            });
        };


        $scope.init();

        changeSuccess = function() {
            return $location.path("/plcs");
        };
        changeError = function() {
            throw new Error("Something went wrong...");
        };

        $scope.abandonChanges = function() {
            return $location.path("/plcs");
        };

        // this needs to come after init()
        return $scope.hasChanges = function() {
            return !angular.equals($scope.plc, plcCopy);
        };


    }]);
