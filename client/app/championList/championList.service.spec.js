'use strict';

describe('Service: championList', function () {

  // load the service's module
  beforeEach(module('riotApiChallenge2App'));

  // instantiate service
  var championList;
  beforeEach(inject(function (_championList_) {
    championList = _championList_;
  }));

  it('should do something', function () {
    expect(!!championList).toBe(true);
  });

});
