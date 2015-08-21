'use strict';

angular.module('riotApiChallenge2App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
	'n3-charts.linechart'
])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
	});