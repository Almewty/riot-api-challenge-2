'use strict';

angular.module('riotApiChallenge2App')
	.controller('MainCtrl', function ($scope, $http, itemList, championList, _) {
		$scope.items = [];
		var statsOld = [],
			statsNew = [],
			championIds = [],
			topTenOld = [],
			topTenNew = [];



		$scope.labels = championIds;
		$scope.series = ['5.11', '5.14'];

		$scope.data = [
			topTenOld,
			topTenNew
		];

		$scope.options = {
			scaleLabel: "<%=value%> games played"
		};

		if ($scope.items.length == 0) {
			itemList.loadItems(function (oldItems, newItems) {
				$scope.items = newItems;
			});
		}

		var champs;

		championList.loadChampions(function (champions) {
			champs = champions;
		});

		$scope.changeData = function (itemId) {
			$('.selected').removeClass('selected');
			$('.list-items img#item-' + itemId).addClass('selected');
			$http.get('/api/by-item/' + itemId).success(function (data) {
				var oldStats = data['5.11'],
					newStats = data['5.14'];
				statsOld.length = 0;
				statsNew.length = 0;
				championIds.length = 0;
				topTenOld.length = 0;
				topTenNew.length = 0;


				// push objects of old stats into array
				for (var i in oldStats) {
					// safety checks and check if the champion id is also present in the statsOld array
					if (oldStats.hasOwnProperty(i) && i != "total" && (_.keys(newStats)).indexOf(i) > 0) {
						var stat = {
							id: parseInt(i),
							win: oldStats[i].win,
							loss: oldStats[i].loss,
							total: oldStats[i].total
						};
						statsOld.push(stat);
					}
				}

				// push objects of new stats into array
				for (var i in newStats) {
					// safety checks and check if the champion id is also present in the statsNew array
					if (newStats.hasOwnProperty(i) && i != "total" && (_.keys(oldStats)).indexOf(i) > 0) {
						var stat = {
							id: parseInt(i),
							win: newStats[i].win,
							loss: newStats[i].loss,
							total: newStats[i].total
						};
						statsNew.push(stat);
					}
				}

				// since we want the top then champions with this item as total games, we have to iterate through the stats arrays -> get the max value and it's id -> delete it -> repeat
				for (var i = 0; i < 10; i++) {
					// get id to delete from array after pushing into topten array
					var deleteIdOld = statsOld.indexOf(_.max(statsOld, function (obj) {
						return obj.total;
					}));

					// search for needed object values
					var oldTotalMax = _.max(statsOld, function (obj) {
						return obj.total;
					}).total;

					topTenOld.push(oldTotalMax);

					statsOld.splice(deleteIdOld, 1);

					var deleteIdNew = statsNew.indexOf(_.max(statsNew, function (obj) {
						return obj.total;
					}));

					var newTotalMax = _.max(statsNew, function (obj) {
						return obj.total;
					}).total;

					var newIdMax = _.max(statsNew, function (obj) {
						return obj.total;
					}).id;

					topTenNew.push(_.max(statsNew, function (obj) {
						return obj.total;
					}).total);

					statsNew.splice(deleteIdNew, 1);

					console.log(newIdMax);
					// push the championId into the array
					championIds.push(champs[_.findKey(champs, function (obj) {
						return obj.key == newIdMax;
					})].name);
				}
			});
		};
	});