'use strict';

angular.module('of5App')
  // ==============================================
  .controller('PlcsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'Restangular',
    function ($rootScope, $scope, $location, $routeParams, Restangular) {

      var defaultRouteArgs = {
        cngSlug: 'crherbs',
        cngAreaSlug: 'crherbsca',
        cngAreaTerrSlug: 'crherbsca12',
        q: '',
        sort: 'bdry,w',
        filter: 'cngAreaTerr:crherbs',
        pp: 5, // items per page
        pg: 5 // page
      };

      $scope.items = [];
      $scope.lastItemsWithInfo = null;
      $scope.maxId = null;
//      $scope.cngId = $routeParams.cngSlug || defaultRouteArgs.cngSlug;
//      $scope.cngAreaId = $routeParams.cngAreaSlug || defaultRouteArgs.cngAreaSlug;
//      $scope.cngAreaTerrId = $routeParams.cngAreaTerrSlug || defaultRouteArgs.cngAreaTerrSlug;
//      $scope.filter = $routeParams.filter || defaultRouteArgs.filter;
      $scope.q = $routeParams.q || defaultRouteArgs.q;
      $scope.pp = $routeParams.pp || defaultRouteArgs.pp;
      $scope.pg = $routeParams.pg || defaultRouteArgs.pg;
      $scope.sort = $routeParams.sort || defaultRouteArgs.sort;
      $scope.args = defaultRouteArgs;

      $scope.cngs = [
        {slug: 'crherbs', 'nam': 'Belen Sur'}
      ];

      $scope.cngAreas = [
        {bdry: 'crherbs', slug: 'crherbsca', 'nam': 'Cariari'},
        {bdry: 'crherbs', slug: 'crherbsla', 'nam': 'Los Arcos'}
      ];

      $scope.cngAreaTerrs = [
//        {slug: '', 'nam': ''},
        {bdry: 'crherbsca', slug: 'crherbsca01', 'nam': 'CA-01 (bogus)'},
        {bdry: 'crherbsca', slug: 'crherbsca12', 'nam': 'CA-12'},
        {bdry: 'crherbsla', slug: 'crherbsla01', 'nam': 'LA-01 (bogus)'},
        {bdry: 'crherbsla', slug: 'crherbsla02', 'nam': 'LA-02 (bogus)'}
      ];

      if (!$routeParams.sort) {$routeParams.sort = defaultRouteArgs.sort;}
//      if (!$routeParams.filter) {$routeParams.filter = defaultRouteArgs.filter;}
//      if (!$routeParams.cngId) {$routeParams.cngId = defaultRouteArgs.cngId;}
//      if (!$routeParams.cngAreaId) {$routeParams.cngAreaId = defaultRouteArgs.cngAreaId;}
//      if (!$routeParams.cngAreaTerrId) {$routeParams.cngAreaTerrId = defaultRouteArgs.cngAreaTerrId;}

      $rootScope.returnRoute = $location.$$url;


      $scope.location = $location;
      $scope.routeParams = $routeParams;


      $scope.$watch('cngAreaTerrId', function(newValue) {
//        console.log('$scope.cngAreaTerrId:', $scope.cngAreaTerrId);
//        console.log('newValue:' + angular.toJson(newValue));
        $location.search('cngAreaTerrId', newValue);
        $scope.cngAreaTerrId = newValue;
      });


      $scope.$watch('routeParams', (function(newVal, oldVal) {
        return angular.forEach(newVal, function(v, k) {

          if (k !== 'where') {
//            console.log('$scope.$watch', k, v);
            $scope[k] = v;
            return $location.search(k, v);
          }
        });
      }), true);

      var Plcs = Restangular.all('plcs');

      var qry = {};

      $scope.doClear = function () {
        $scope.q = $scope.location.q = $scope.routeParams.q = defaultRouteArgs.q;
        $scope.cngId = $scope.location.cngId = $scope.routeParams.cngId = defaultRouteArgs.cngId;
        $scope.cngAreaId = $scope.location.cngAreaId = $scope.routeParams.cngAreaId = defaultRouteArgs.cngAreaId;
        $scope.cngAreaTerrId = $scope.location.cngAreaTerrId = $scope.routeParams.cngAreaTerrId = defaultRouteArgs.cngAreaTerrId;
        $scope.doSearch();
      };

      // doSearch -------------------------------------------
      $scope.doSearch = function () {
        var args = {};
//        console.log('doSearch', $routeParams);
        var whereParts = {};
        if ($scope.q)                   { whereParts.dNam = {$regex: $scope.q, $options:'i'}; }
        if (typeof($routeParams.cngAreaTerrId) !== 'boolean' &&
          $routeParams.cngAreaTerrId) { whereParts.bdry = $routeParams.cngAreaTerrId; }
        if (whereParts)                 { args.where = JSON.stringify(whereParts); }

        if ($routeParams.sort)          { args.sort = $routeParams.sort; }

//        console.log('args', args);
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
  .controller('PlcFormCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'Restangular',
    function ($rootScope, $scope, $location, $routeParams, Restangular) {

      var insertMode = $location.$$path === '/plc/insert';

      if (insertMode) {
        $scope.mode = 'Add New';
      } else {
        $scope.mode = 'Update';
        var Plc = Restangular.one('plcs', $routeParams.id);

        Plc.get()
          .then(function (item) {
            $scope.dNam = item.dNam;
            $scope.item = {};
            $scope.item._id = item._id || null;
            $scope.item.bdry = item.bdry || '';
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
        console.log('save');
        if (insertMode) {
          data = 'doc=' + JSON.stringify(item);
          var Plcs = Restangular.all('plcs');
          Plcs.post(data).then(function() {
            window.location.href = '#' + $rootScope.returnRoute;
          }, function errorCallback() {
            console.log('Oops error from server :(');
          });


        } else {
          if (undefined !== item.tags && item.tags > '') {
            item.tags = item.tags.split(',');
          } else {
            item.tags = [];
          }


          if (undefined !== item.lng && undefined !== item.lat) {
            item.pt = [item.lng, item.lat];
            delete item.lat;
            delete item.lng;
          }
          delete item._id;

          console.log('item', item);
          data = JSON.stringify({'actions': {'$set': {'flds': item}}});

          Plc.customPUT(undefined, undefined, undefined, data).then(function(itemUpdated) {
            window.location.href = '#' + $rootScope.returnRoute;
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
  .controller('PlcViewCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'Restangular',
    function ($rootScope, $scope, $location, $routeParams, Restangular) {

      var Plc = Restangular.one('plcs', $routeParams.id);

      Plc.get()
        .then(function (item) {
          $scope.item = item;
          if (undefined !== item.pt){
            $scope.lng = item.pt[0];
            $scope.lat = item.pt[1];
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
//              return $location.path('/plcs');
              window.location.href = '#' + $rootScope.returnRoute;
            }, function errorCallback() {
              console.log('Oops error from server :(');
              window.location.href = '#' + $rootScope.returnRoute;
//              return $location.path('/plc/' + $routeParams.id);
            });
        }
      };

      $scope.edit = function (item) {
        return $location.path('/plc/' + item._id + '/edit');
      };

    }])
;
