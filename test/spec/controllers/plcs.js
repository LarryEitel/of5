'use strict';

describe('Controller: PlcsCtrl', function () {

  // load the controller's module
  beforeEach(module('of5App'));

  var PlcsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlcsCtrl = $controller('PlcsCtrl', {
      $scope: scope
    });
  }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect(scope.awesomeThings.length).toBe(3);
//  });
});
