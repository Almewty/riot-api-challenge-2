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
        $scope.names = [];
        championList.success(function (data) {
            var championData = data.data;
            var temp = [];
            for (var i in championData) {
                if (championData.hasOwnProperty(i)) {
                    temp.push(championData[i].name);
                }
            }
            console.log($scope.names);
            $scope.names = temp;
        });
    });