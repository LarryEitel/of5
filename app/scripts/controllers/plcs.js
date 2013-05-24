'use strict';

angular.module('of5App')


  // ==============================================
  .controller('PlcFormCtrl', ['$scope', '$location', '$routeParams', 'Restangular',
    function ($scope, $location, $routeParams, Restangular) {

      var insertMode = $location.$$path === '/plc/insert';

      if (insertMode) {
        console.log('Insert mode');

      } else {
        console.log('Edit mode');
        var Plc = Restangular.one('plcs', $routeParams.id);

        Plc.get()
          .then(function (item) {
            $scope.item = item;

            if (undefined !== item.pts){
              $scope.lat = item.pts[0];
              $scope.lng = item.pts[1];
            }

          }, function errorCallback() {
            console.log('Oops error from server :(');
          });
      }

      $scope.remove = function (item) {
        var confirmRemove = confirm('Are you absolutely sure you want to delete?');

        if (confirmRemove) {
          var Plc = Restangular.one('plcs', item._id);
          Plc.remove()
            .then(function () {
              return $location.path('/plcs');
            }, function errorCallback() {
              console.log('Oops error from server :(');
              return $location.path('/plc/' + $routeParams.id);
            });
        }
      };

      $scope.save = function (item) {
        var data = 'doc=' + JSON.stringify(item);
        if (insertMode) {
          var Plcs = Restangular.all('plcs');
          Plcs.post(data).then(function(itemAdded) {
            return $location.path('/plc/' + itemAdded.doc._id);
          });

        }
      };

//        var changeError, changeSuccess, plcCopy;
//      var changeError, changeSuccess;
//
//      $scope.put = function () {
//        var actions;
//        console.log('PlcEditCtrl.put');
//        actions = {
//          '$set': {
//            'flds': {
//              'lbl': $scope.plc.lbl
//            }
//          }
//        };
//        return Plc.put(JSON.stringify({
//          'actions': actions
//        }), changeSuccess, changeError);
//      };
//
//      changeSuccess = function () {
//        return $location.path('/plcs');
//      };
//      changeError = function () {
//        throw new Error('Something went wrong...');
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

      $scope.remove = function (item) {
        var confirmRemove = confirm('Are you absolutely sure you want to delete?');

        if (confirmRemove) {
          var Plc = Restangular.one('plcs', item._id);
          Plc.remove()
            .then(function () {
              return $location.path('/plcs');
            }, function errorCallback() {
              console.log('Oops error from server :(');
              return $location.path('/plc/' + $routeParams.id);
            });
        }
      };

      $scope.insert = function () {
        return $location.path('/plc/insert');
      };
      $scope.edit = function (item) {
        return $location.path('/plc/' + item._id + '/edit');
      };
      $scope.view = function (item) {
        return $location.path('/plc/' + item._id);
      };
    }])


  // ==============================================
  .controller('PlcViewCtrl', ['$scope', '$location', '$routeParams', 'Restangular',
    function ($scope, $location, $routeParams, Restangular) {

      var Plc = Restangular.one('plcs', $routeParams.id);

      Plc.get()
        .then(function (item) {
          $scope.item = item;
          if (undefined !== item.pts){
            $scope.lat = item.pts[0];
            $scope.lng = item.pts[1];
          }


        }, function errorCallback() {
          console.log('Oops error from server :(');
        });

      $scope.remove = function (item) {
        var confirmRemove = confirm('Are you absolutely sure you want to delete?');

        if (confirmRemove) {
          var Plc = Restangular.one('plcs', item._id);
          Plc.remove()
            .then(function () {
              return $location.path('/plcs');
            }, function errorCallback() {
              console.log('Oops error from server :(');
              return $location.path('/plc/' + $routeParams.id);
            });
        }
      };

    }])
;
