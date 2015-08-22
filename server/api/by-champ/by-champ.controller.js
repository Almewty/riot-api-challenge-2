/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var Participant = require('../participant/participant.model');

// Get list of things
exports.byChamp = function (req, res) {
	var champId = req.params.champId;
	if (isNaN(champId))
		return handleError(res, "Bad item id");
	champId = Number(champId);
	Participant.find({
		championId: champId
	}, 'patch stats', function (err, data) {
		if (err) return handleError(res, err);
		var total = data.length;
		var totalWin = 0;
		var totalLoss = 0;
		data = groupBy(data, 'patch');
		for (var p in data) {
			var items = {};
			for (var j = 0; j < data[p].length; j++) {
				for (var i = 0; i <= 6; i++) {
					var item = data[p][j].stats['item' + i];
					if (!(item in items)) {
						items[item] = {};
						items[item]['win'] = 0;
						items[item]['loss'] = 0;
						items[item]['total'] = 0;
					}
					items[item]['total']++;
					items[item][data[p][j].stats.winner ? 'win' : 'loss']++;
				}
			}
			var winLoss = _.countBy(data[p], function (p) {
				return p.stats.winner ? 'win' : 'loss';
			});
			winLoss.total = winLoss.win + winLoss.loss;
			totalWin += winLoss.win;
			totalLoss += winLoss.loss;
			data[p] = _.extend(winLoss, items);
		}
		data.win = totalWin;
		data.loss = totalLoss;
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