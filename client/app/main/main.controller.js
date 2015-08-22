'use strict';

angular.module('riotApiChallenge2App')
    .controller('MainCtrl', function ($scope, itemList) {
        $scope.items = [];

        if ($scope.items.length == 0) {
            itemList.loadItems(function () {
                $scope.items = itemList.getNewItems();
            });
        }

        $scope.changeData = function (itemId) {};
    });