'use strict';

angular.module('riotApiChallenge2App')
	.factory('championList', function ($http) {
		var champions = [];
		var mages = false;

		//check for a given item tag
		function checkForTags(object, tag) {
			var seen = false;
			var itemTags = object.tags;
			if (itemTags != undefined && itemTags != null) {
				for (var j = 0; j != itemTags.length; ++j) {
					if (itemTags.hasOwnProperty(j)) {
						if (itemTags[j] == tag) seen = true;
					}
				}
			}
			return seen;
		};

		return {
			loadChampions: function (callback, mages) {
				$http.get('/app/championList/champion.json').success(function (data) {
					if (champions.length == 0) {
						var championData = data.data;
						for (var i in championData) {
							if (championData.hasOwnProperty(i) && mages ? checkForTags(championData[i], "Mage") : true) {
								champions.push(championData[i]);
							}
						}
						callback(champions);
					} else callback(champions);
				});
			},
		}
	});