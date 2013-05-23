'use strict';

angular.module('of5App')
  .controller('MainCtrl',
    [ '$scope', 'Restangular', function($scope, Restangular) {
      var Plcs = Restangular.all('plcs');
      $scope.plcs = Plcs.getList();
    }]);
