'use strict';

angular.module('riotApiChallenge2App')
    .factory('championList', function ($http) {
        return $http.get('/app/championList/champion.json');
    });