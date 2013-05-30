'use strict';

angular.module('of5App')
  // ==============================================
  .controller('PlcsCtrl', ['$scope', '$location', '$routeParams', 'Restangular',
    function ($scope, $location, $routeParams, Restangular) {

      var defaultRouteArgs = {
        sort: 'bdry,-w',
        pp: 5, // items per page
        pg: 5 // page
      };

      $scope.items = [];
      $scope.lastItemsWithInfo = null;
      $scope.maxId = null;
      $scope.q = $routeParams.q;
      $scope.pp = $routeParams.pp;
      $scope.pg = $routeParams.pg;
      $scope.args = defaultRouteArgs;

      if (!$routeParams.sort) {
        $routeParams.sort = defaultRouteArgs.sort;
      }

      $scope.location = $location;
      $scope.routeParams = $routeParams;


      $scope.$watch('routeParams', (function(newVal, oldVal) {
        return angular.forEach(newVal, function(v, k) {
          if (k !== 'where') {
            return $location.search(k, v);
          }
        });
      }), true);

      var Plcs = Restangular.all('plcs');

      var qry = {};

      $scope.doClear = function () {
        $scope.q = '';
        $scope.location.q = '';
        $scope.routeParams.q = '';
        $scope.doSearch();
      };

      $scope.doSearch = function () {
        var args = $routeParams;
        if ($scope.q){
          args.where = JSON.stringify(
            {dNam:{$regex: $scope.q, $options:'i'}}
            );
        }

        Plcs.getList(args)
          .then(function (items) {
            $scope.items = items._items;
            if ($scope.q) {
              $location.search('q', $scope.q);
            }
          }, function errorCallback() {
            console.log('Oops error from server :(');
          });
      };

      $scope.add = function () {
        var data = 'doc=' + JSON.stringify($scope.newItem);
        var Plcs = Restangular.all('plcs');
        Plcs.post(data).then(function(itemAdded) {
          $scope.newItem._id = itemAdded.doc._id;
          $scope.items.push($scope.newItem);
          $scope.newItem = {};

          // todo Can't set Pristine
          $scope.myForm.$setPristine();
          $scope.myForm.$pristine = true;
        });
      };

      $scope.remove = function ($index) {
        var confirmRemove = confirm('Are you absolutely sure you want to delete?');
//        var confirmRemove = true;

        if (confirmRemove) {
          var item = $scope.items[$index];
          var Plc = Restangular.one('plcs', item._id);
          Plc.remove()
            .then(function () {
              $scope.items.splice($index, 1);
            }, function errorCallback() {
              console.log('Oops error from server :(');
              return $location.path('/plc/' + $routeParams.id);
            });
        }
      };
//
//      $scope.remove = function (item) {
//        var confirmRemove = confirm('Are you absolutely sure you want to delete?');
//
//        if (confirmRemove) {
//          var Plc = Restangular.one('plcs', item._id);
//          Plc.remove()
//            .then(function () {
//              return $location.path('/plcs');
//            }, function errorCallback() {
//              console.log('Oops error from server :(');
//              return $location.path('/plc/' + $routeParams.id);
//            });
//        }
//      };



      $scope.insert = function () {
        return $location.path('/plc/insert');
      };
      $scope.edit = function ($index) {
        var item = $scope.items[$index];
        return $location.path('/plc/' + item._id + '/edit');
      };
      $scope.view = function ($index) {
        var item = $scope.items[$index];
        return $location.path('/plc/' + item._id);
      };

      //do the search  for the first time
      $scope.doSearch();

    }])



  // ==============================================
  .controller('PlcFormCtrl', ['$scope', '$location', '$routeParams', 'Restangular',
    function ($scope, $location, $routeParams, Restangular) {

      var insertMode = $location.$$path === '/plc/insert';

      if (insertMode) {
      } else {
        var Plc = Restangular.one('plcs', $routeParams.id);

        Plc.get()
          .then(function (item) {
            $scope.dNam = item.dNam;
            $scope.item = {};
            $scope.item.nam = item.nam || '';
            $scope.item.namS = item.namS || '';
            $scope.item.addr = item.addr;
            $scope.item.desc = item.desc;
            if (typeof(item.tags) !== 'undefined') {
              $scope.item.tags = item.tags.join(',');
            } else {
              $scope.item.tags = '';
            }
            if (typeof(item.pt) !== 'undefined'){
              $scope.item.lng = item.pt[0];
              $scope.item.lat = item.pt[1];
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
        var data = {};
        if (insertMode) {
          data = 'doc=' + JSON.stringify(item);
          var Plcs = Restangular.all('plcs');
          Plcs.post(data).then(function() {
            return $location.path('/plcs/');
          }, function errorCallback() {
            console.log('Oops error from server :(');
          });
        } else {

          if (undefined !== item.tags) {
            item.tags = item.tags.split(',');
          }


          item.pts = [item.lng, item.lat];
          delete item.lat;
          delete item.lng;

          data = JSON.stringify({'actions': {'$set': {'flds': item}}});

          Plc.customPUT(undefined, undefined, undefined, data).then(function(itemUpdated) {
            return $location.path('/plc/' + itemUpdated.doc._id);
          }, function errorCallback() {
            console.log('Oops error from server :(');
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

      $scope.edit = function (item) {
        return $location.path('/plc/' + item._id + '/edit');
      };

    }])
;
