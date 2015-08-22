'use strict';

angular.module('riotApiChallenge2App')
    .controller('MainCtrl', function ($scope, itemList) {
        $scope.items = [];

        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        $scope.series = ['5.11.1', '5.14.1'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        if ($scope.items.length == 0) {
            itemList.loadItems(function () {
                $scope.items = itemList.getNewItems();
            });
        }

        $scope.changeData = function (itemId) {
            $('.selected').removeClass('selected');
            $('.list-items img#item-' + itemId).addClass('selected');
            console.log(itemId);
        };
    });