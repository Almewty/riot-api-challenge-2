'use strict';

angular.module('riotApiChallenge2App')
	.controller('NavbarCtrl', function ($scope, $location) {
		$scope.menu = [{
			'title': 'By Item',
			'pattern': /^\/$/,
			'state': 'main'
    }, {
			'title': 'By Champ',
			'pattern': /^\/by-champ.*/,
			'state': 'byChamp'
	}];

		$scope.isCollapsed = true;

		$scope.isActive = function (route) {
			var regex = new RegExp(route);
			return regex.test($location.path());
		};
	});