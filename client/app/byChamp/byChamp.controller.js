'use strict';

angular.module('riotApiChallenge2App')
	.controller('ByChampCtrl', function ($scope, $http, championList, itemList, _) {
		$scope.champions = [];
		var statsOld = [],
			statsNew = [],
			itemIds = [],
			topTenOld = [],
			topTenNew = [];

		var magesEnabled = true;

		$scope.labels = itemIds;
		$scope.series = ['5.11', '5.14'];

		$scope.data = [
			topTenOld,
			topTenNew
		];

		$scope.options = {
			scaleLabel: "<%=value%> games played"
		};

		if ($scope.champions.length == 0) {
			championList.loadChampions(function (champions) {
				$scope.champions = champions;
			}, true);
		}

		var items;

		itemList.loadItems(function (i) {
			items = i;
		});

		$scope.changeData = function (champId) {
			$('.selected').removeClass('selected');
			$('.list-champions img#champion-' + champId).addClass('selected');
			$http.get('/api/by-champ/' + champId).success(function (data) {
				var oldStats = data['5.11'],
					newStats = data['5.14'];
				statsOld.length = 0;
				statsNew.length = 0;
				itemIds.length = 0;
				topTenOld.length = 0;
				topTenNew.length = 0;


				// push objects of old stats into array
				for (var i in oldStats) {
					// safety checks and check if the item id is also present in the statsOld array
					if (oldStats.hasOwnProperty(i) && i != "total" && (_.keys(newStats)).indexOf(i) > 0 && i != "3340" && i != "3341" && i != "3342") {
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
					// safety checks and check if the item id is also present in the statsNew array
					if (newStats.hasOwnProperty(i) && i != "total" && (_.keys(oldStats)).indexOf(i) > 0 && i != "3340" && i != "3341" && i != "3342") {
						var stat = {
							id: parseInt(i),
							win: newStats[i].win,
							loss: newStats[i].loss,
							total: newStats[i].total
						};
						statsNew.push(stat);
					}
				}

				// since we want the top then items with this champion as total games, we have to iterate through the stats arrays -> get the max value and it's id -> delete it -> repeat
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

					console.log(newIdMax);

					topTenNew.push(_.max(statsNew, function (obj) {
						return obj.total;
					}).total);

					statsNew.splice(deleteIdNew, 1);

					// push the itemIds into the array
					itemIds.push(items[_.findKey(items, function (obj) {
						return obj.key == newIdMax;
					})].name);
				}
			});
		};
	});