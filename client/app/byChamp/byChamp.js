'use strict';

angular.module('riotApiChallenge2App')
	.config(function ($stateProvider) {
		$stateProvider
			.state('byChamp', {
				url: '/by-champ/:champId',
				templateUrl: 'app/byChamp/byChamp.html',
				controller: 'ByChampCtrl'
			});
	});