'use strict';

angular.module('of5App')

    .controller('PlcEditCtrl', ['$scope', '$location', '$routeParams', 'Plcs', 'Plc', 'User',
            function ($scope, $location, $routeParams, Plcs, Plc, User) {

        var changeError, changeSuccess, plcCopy;

        $scope.put = function () {
            var actions;
            console.log('PlcEditCtrl.put');
            actions = {
                "$set": {
                    "flds": {
                        "lbl": $scope.plc.lbl
                    }
                }
            };
            return Plc.put(JSON.stringify({
                "actions": actions
            }), changeSuccess, changeError);
        };


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
    }])


    .controller('PlcsCtrl', ['$scope', '$location', '$routeParams', 'Plcs', 'Plc', function ($scope, $location, $routeParams, Plcs, Plc) {

        $scope.Plcs = new Plcs();
        //Get All Users from the API
        $scope.Plcs.$find().success(function() {
            console.log("Plcs.$find()");
            var current;
            while(current = $scope.Plcs.$fetch()) { //fetching on masters object
                console.log("Fetched Data into Master Object",$scope.Plcs.$toObject()) //reading fetched from master
                //or just get the fetched object itself
                console.log("Real fetched Object",current.$toObject())
            }
        });

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



    .controller('PlcViewCtrl', ['$scope', '$routeParams', 'Plcs', 'Plc', 'User'/*, 'plc'*/, function ($scope, $routeParams, Plcs, Plc, User/*, plc*/) {
//        $scope.plc = plc
        // strange that this makes a get call!
        $scope.OnePlc = new Plcs();
//
//        $scope.OnePlc.$get($routeParams.id).success(function() {
//            var plc = $scope.OnePlc.$fetch();
//            console.log("OnePlc", plc);
//            $scope.plc = plc;
//            $scope.lat = plc.pts[0];
//            $scope.lng = plc.pts[1];
//        });

        $scope.init = function () {
            $scope.OnePlc
                    .$getById($routeParams.id)
//                    .$get($routeParams.id)
                    .success(function(raw) {
                console.log('raw', raw);
                $scope.raw = raw;
                var plc = $scope.OnePlc.$fetch();
                console.log("OnePlc.$fetch()", plc);
                $scope.plc = plc;
                $scope.lat = plc.pts[0];
                $scope.lng = plc.pts[1];
            });
        };

        $scope.init();


//
//        $scope.init = function () {
//            Plc.getById($routeParams.id, function(plc){
//                $scope.plc = plc;
//                $scope.lat = plc.pts[0];
//                $scope.lng = plc.pts[1];
//            });
//        };
//
//        $scope.init();
    }])


    ;
