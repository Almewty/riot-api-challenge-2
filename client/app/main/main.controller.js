'use strict';

angular.module('riotApiChallenge2App')
    .controller('MainCtrl', function ($scope, $http) {
        $scope.awesomeThings = [];

        $http.get('/api/things').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });

        $scope.addThing = function () {
            if ($scope.newThing === '') {
                return;
            }
            $http.post('/api/things', {
                name: $scope.newThing
            });
            $scope.newThing = '';
        };

        $scope.deleteThing = function (thing) {
            $http.delete('/api/things/' + thing._id);
        };
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