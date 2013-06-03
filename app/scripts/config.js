'use strict';

angular.module('ofApp')
  .controller('GPlsCtrl', ['$location', '$scope', function($location, $scope) {
    if ($location.$$host === 'localhost') {
      $scope.clientId = '389499396751'; // localhost:9000
    } else {
      $scope.clientId = '389499396751-na26guo6nsi4fvvif45ub9gcpru08q47.apps.googleusercontent.com';
    }
  }]);
