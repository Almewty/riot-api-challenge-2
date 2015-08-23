'use strict';

angular.module('riotApiChallenge2App')
    .controller('MainCtrl', function ($scope, $http, itemList) {
        $scope.items = [];
        var championIds = [],
            totalOld = [],
            totalNew = [];

        $scope.labels = championIds;
        $scope.series = ['5.11', '5.14'];

        $scope.data = [
            totalOld,
            totalNew
        ];

        if ($scope.items.length == 0) {
            itemList.loadItems(function () {
                $scope.items = itemList.getNewItems();
            });
        }

        $scope.changeData = function (itemId) {
            $('.selected').removeClass('selected');
            $('.list-items img#item-' + itemId).addClass('selected');
            $http.get('/api/by-item/' + itemId).success(function (data) {
                var statsOld = data['5.11'],
                    statsNew = data['5.14'];
                championIds.length = 0;

                for (var i in statsOld) {
                    if (i !== "total") {
                        championIds.push(i);
                        totalOld.push(statsOld[i].total);
                    }
                }
                for (var i in statsNew) {
                    if (i !== "total") {
                        totalNew.push(statsNew[i].total);
                    }
                }
            });
        };
    });