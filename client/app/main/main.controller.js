'use strict';

angular.module('riotApiChallenge2App')
	.controller('MainCtrl', function ($scope, $http) {

	})
	.controller('ChampionlistCtrl', function ($scope, championList) {
		$scope.champions = [];

		if ($scope.champions.length == 0) {
			championList.loadChampions(function () {
				$scope.champions = championList.getChampions();
			});
		}
	})
	.controller('ItemlistCtrl', function ($scope, itemList) {
		$scope.items = [];

		if ($scope.items.length == 0) {
			itemList.loadItems(function () {
				$scope.items = itemList.getAPItems();
			});
		}
	});