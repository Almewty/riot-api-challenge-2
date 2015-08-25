'use strict';

angular.module('riotApiChallenge2App')
	.factory('championList', function ($http) {
		var champions = [];

		return {
			loadChampions: function (callback) {
				$http.get('/app/championList/champion.json').success(function (data) {
					var championData = data.data;
					for (var i in championData) {
						if (championData.hasOwnProperty(i)) {
							champions.push(championData[i]);
						}
					}
					callback();
				});
			},
			getChampions: function () {
				return champions;
			},
		};
	});