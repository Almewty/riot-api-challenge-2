'use strict';

angular.module('riotApiChallenge2App')
	.controller('ByChampCtrl', function ($scope, championList) {
		$scope.champions = [];

		if ($scope.champions.length == 0) {
			championList.loadChampions(function () {
				$scope.champions = championList.getChampions();
			});
		}
	});