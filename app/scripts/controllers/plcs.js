'use strict';

angular.module('of5App')
  // ==============================================
  .controller('PlcEditCtrl', ['$scope', '$location', '$routeParams', 'Restangular',
    function ($scope, $location, $routeParams, Restangular) {

      var Plc = Restangular.one('plcs', $routeParams.id);

      Plc.get({single: true})
        .then(function (item) {
          $scope.item = item;
          $scope.lat = item.pts[0];
          $scope.lng = item.pts[1];

        }, function errorCallback() {
          console.log('Oops error from server :(');
        });

//        var changeError, changeSuccess, plcCopy;
//      var changeError, changeSuccess;
//
//      $scope.put = function () {
//        var actions;
//        console.log('PlcEditCtrl.put');
//        actions = {
//          "$set": {
//            "flds": {
//              "lbl": $scope.plc.lbl
//            }
//          }
//        };
//        return Plc.put(JSON.stringify({
//          "actions": actions
//        }), changeSuccess, changeError);
//      };
//
//      changeSuccess = function () {
//        return $location.path("/plcs");
//      };
//      changeError = function () {
//        throw new Error("Something went wrong...");
//      };

      $scope.abandonChanges = function () {
        return $location.path('/plc/' + $scope.item._id);
      };

    }])


  // ==============================================
  .controller('PlcsCtrl', ['$scope', '$location', '$routeParams', 'Restangular',
    function ($scope, $location, $routeParams, Restangular) {

      var Plcs = Restangular.all('plcs');

      Plcs.getList({where: JSON.stringify({}), 'max_results': 10})
        .then(function (items) {
          $scope.items = items._items;

        }, function errorCallback() {
          console.log('Oops error from server :(');
        });

      $scope.edit = function (item) {
        return $location.path('/plc/' + item._id + '/edit');
      };
      $scope.view = function (item) {
        return $location.path('/plc/' + item._id);
      };
    }])


  // ==============================================
  .controller('PlcViewCtrl', ['$scope', '$routeParams', 'Restangular',
    function ($scope, $routeParams, Restangular) {

      var Plc = Restangular.one('plcs', $routeParams.id);

      Plc.get({single: true})
        .then(function (item) {
          $scope.item = item;

        }, function errorCallback() {
          console.log('Oops error from server :(');
        });
    }])
;
