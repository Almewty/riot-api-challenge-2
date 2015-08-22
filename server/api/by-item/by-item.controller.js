/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var Participant = require('../participant/participant.model');

// Get list of things
exports.byItem = function (req, res) {
	var itemId = req.params.itemId;
	if (isNaN(itemId))
		return handleError(res, "Bad item id");
	itemId = Number(itemId);
	Participant.find({
		$or: [{
			'stats.item0': itemId
			}, {
			'stats.item1': itemId
			}, {
			'stats.item2': itemId
			}, {
			'stats.item3': itemId
			}, {
			'stats.item4': itemId
			}, {
			'stats.item5': itemId
			}, {
			'stats.item6': itemId
			}]
	}, 'patch championId stats', function (err, data) {
		if (err) return handleError(res, err);
		var total = data.length;
		data = groupBy(data, 'patch');
		for (var p in data) {
			data[p] = groupBy(data[p], 'championId');
			var thisPatch = 0;
			for (var c in data[p]) {
				var length = data[p][c].length;
				thisPatch += length;
				var winLoss = _.countBy(data[p][c], function (p) {
					return p.stats.winner ? 'win' : 'loss';
				});
				data[p][c] = {};
				data[p][c] = _.extend(data[p][c], winLoss);
				data[p][c]['win'] = data[p][c]['win'] || 0;
				data[p][c]['loss'] = data[p][c]['loss'] || 0;
				data[p][c]['total'] = length;
			}
			data[p].total = thisPatch;
		}
		data.total = total;
		return res.status(200).json(data);
	});
};

function groupBy(arr, prop) {
	var hist = {};
	arr.map(function (a) {
		if (a[prop] in hist) hist[a[prop]].push(a);
		else hist[a[prop]] = [a];
	});
	return hist;
}

function handleError(res, err) {
	return res.status(500).send(err);
}