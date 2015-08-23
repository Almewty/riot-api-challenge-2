'use strict';

describe('Controller: ByChampCtrl', function () {

  // load the controller's module
  beforeEach(module('riotApiChallenge2App'));

  var ByChampCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ByChampCtrl = $controller('ByChampCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
