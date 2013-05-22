'use strict';

angular.module('of5App')

    .controller('PlcEditCtrl', ['$scope', '$location', '$routeParams', 'Plcs', 'Plc', 'User',
            function ($scope, $location, $routeParams, Plcs, Plc, User) {

        $scope.Plcs = new Plcs();
        $scope.init = function () {
            $scope.Plcs
                .$getById($routeParams.id)
                .success(function(raw) {

                    var item = $scope.Plcs.$fetch();
                    $scope.raw = raw;
                    $scope.item = item;
                    $scope.lat = item.pts[0];
                    $scope.lng = item.pts[1];
                });
        };

        $scope.init();

//        var changeError, changeSuccess, plcCopy;
        var changeError, changeSuccess;

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

        changeSuccess = function() {
            return $location.path("/plcs");
        };
        changeError = function() {
            throw new Error("Something went wrong...");
        };

        $scope.abandonChanges = function() {
            return $location.path("/plc/" + $scope.item._id);
        };

    }])


    .controller('PlcsCtrl', ['$scope', '$location', '$routeParams', 'Plcs', 'Plc', function ($scope, $location, $routeParams, Plcs, Plc) {

        $scope.Plcs = new Plcs();

        $scope.init = function () {
            $scope.Plcs
//                .$find({where: {slug: "2a"}})
                .$find({where: {}, max_results: 10})
                .success(function(raw) {
                    console.log('PlcsCtrl.raw', raw);
                    $scope.raw = raw;
                    var plcs = $scope.Plcs.$fetch();
                    $scope.plcs = plcs;
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
        $scope.Plcs = new Plcs();
        $scope.init = function () {
            $scope.Plcs
                    .$getById($routeParams.id)
                    .success(function(raw) {

                var item = $scope.Plcs.$fetch();
                $scope.raw = raw;
                $scope.item = item;
                $scope.lat = item.pts[0];
                $scope.lng = item.pts[1];
            });
        };

        $scope.init();
    }])
    ;
