'use strict';

angular.module('riotApiChallenge2App')
    .factory('itemList', function ($http) {
        var items = [];
        items.all = [];
        items.ap = [];
        var unpurchasable = [];

        $http.get('/app/itemList/unpurchasableSR.json').success(function (data) {
            unpurchasable = data.data['11'].unpurchasableItemList;
        });

        //check if item is in unpurchasable array
        function checkForUnpurchasable(object) {
            for (var i = 0; i < unpurchasable.length; i++) {
                if (object.id == unpurchasable[i]) return true;
            }
            return false;
        };

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
            loadItems: function (callback) {
                $http.get('/app/itemList/itemnew.json').success(function (data) {
                    var itemData = data.data;

                    for (var i in itemData) {
                        if (itemData.hasOwnProperty(i) && !checkForUnpurchasable(itemData[i]) && !checkForTags(itemData[i], "Bilgewater")) {
                            items.all.push(itemData[i]);
                            if (checkForTags(itemData[i], "SpellDamage")) items.ap.push(itemData[i]);
                        }
                    }
                    callback();
                });
            },

            getAllItems: function () {
                return items.all;
            },
            getAPItems: function () {
                return items.ap;
            },
        };
    });