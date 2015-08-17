/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Match = require('../api/match/match.model');
var mongoose = require('mongoose');
var matches = require('./data.json');
var _ = require('underscore');
var async = require('async');

Array.range = function (n) {
	// Array.range(5) --> [0,1,2,3,4]
	return Array.apply(null, Array(n)).map(function (x, i) {
		return i
	})
};

Object.defineProperty(Array.prototype, 'chunk', {
	value: function (n) {
		// ACTUAL CODE FOR CHUNKING ARRAY:
		return Array.range(Math.ceil(this.length / n)).map(function (x, i) {
			return this.slice(i * n, i * n + n);
		}.bind(this));
	}
});

var createMatches = function () {
	console.log("creating matches");
	var i = 0;
	async.eachSeries(matches, function (match, callback) {
		new Match(match).save(callback); //.save(callback);
	});
};

Match.count({}, function (err, count) {
	if (count !== matches.length) {
		mongoose.connection.db.dropCollection(Match.modelName, createMatches);
	}
});