"use strict"
angular.module("ofApp").controller "MainCtrl", ["$scope", "Restangular", ($scope, Restangular) ->
    Plcs = Restangular.all("plcs")
    $scope.plcs = Plcs.getList()
]
