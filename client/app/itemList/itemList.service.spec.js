'use strict';

describe('Service: itemList', function () {

  // load the service's module
  beforeEach(module('riotApiChallenge2App'));

  // instantiate service
  var itemList;
  beforeEach(inject(function (_itemList_) {
    itemList = _itemList_;
  }));

  it('should do something', function () {
    expect(!!itemList).toBe(true);
  });

});
