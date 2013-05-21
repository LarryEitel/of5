'use strict';

describe('Service: xchglabResourceHttp', function () {

  // load the service's module
  beforeEach(module('of5App'));

  // instantiate service
  var xchglabResourceHttp;
  beforeEach(inject(function (_xchglabResourceHttp_) {
    xchglabResourceHttp = _xchglabResourceHttp_;
  }));

  it('should do something', function () {
    expect(!!xchglabResourceHttp).toBe(true);
  });

});
