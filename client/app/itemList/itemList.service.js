'use strict';

angular.module('riotApiChallenge2App')
    .factory('itemList', function ($http) {
        var items = [];

        return {
            loadItems: function (callback) {
                $http.get('/app/itemList/itemnew.json').success(function (data) {
                    var itemData = data.data;
                    for (var i in itemData) {
                        if (itemData.hasOwnProperty(i)) {
                            items.push(itemData[i]);
                        }
                    }
                    console.log(items);
                    callback();
                });
            },
            getItems: function () {
                return items;
            },
        };
    });