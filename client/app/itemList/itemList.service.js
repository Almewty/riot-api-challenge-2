'use strict';

angular.module('riotApiChallenge2App')
    .factory('itemList', function ($http) {
        var oldItems = [];
        var newItems = [];

        return {
            loadItems: function (callback) {
                $http.get('/app/itemList/apitems.json').success(function (data) {
                    oldItems = data['5.11.1'];
                    newItems = data['5.14.1'];
                    callback();
                });
            },
            getOldItems: function () {
                return oldItems;
            },
            getNewItems: function () {
                return newItems;
            },
        };
    });