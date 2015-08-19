/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Match = require('../api/match/match.model');
var mongoose = require('mongoose');
var data = require('./data.json');
var _ = require('underscore');
var async = require('async');

var matchCount = 400000;

//Array.range = function(n) {
//	// Array.range(5) --> [0,1,2,3,4]
//	return Array.apply(null, Array(n)).map(function (x, i) {
//		return i
//	})
//};
//
//Object.defineProperty(Array.prototype, 'chunk', {
//	value: function (n) {
//		// ACTUAL CODE FOR CHUNKING ARRAY:
//		return Array.range(Math.ceil(this.length / n)).map(function (x, i) {
//			return this.slice(i * n, i * n + n);
//		}.bind(this));
//	}
//});

var createAllMatches = function createAllMatches() {
	for (var patch in data) {
		if (data.hasOwnProperty(patch)) {
			var patchData = data[patch];
			for (var queue in patchData) {
				if (patchData.hasOwnProperty(queue)) {
					var queueData = patchData[queue];
					for (var region in queueData) {
						if (queueData.hasOwnProperty(region)) {
							var matches = queueData[region];
							createMatches(patch, queue, region, matches);
						}
					}
				}
			}
		}
	}
};

var createMatches = function (patch, queue, region, matches) {
	async.eachLimit(matches, 8, function (match, callback) {
		new Match({
			patch: patch,
			type: queue,
			region: region,
			id: match,
			loaded: false
		}).save(callback);
	});
};

Match.count({}, function (err, count) {
	if (count > matchCount) {
		Match.remove({}, createAllMatches);
	}
});