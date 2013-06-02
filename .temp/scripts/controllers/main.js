'use strict';

angular.module('ofApp')
  .controller('MainCtrl',
    [ '$scope', 'Restangular', function($scope, Restangular) {
      var Plcs = Restangular.all('plcs');
      $scope.plcs = Plcs.getList();
    }]);


