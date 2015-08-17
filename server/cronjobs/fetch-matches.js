var Match = require('../api/match/match.model.js'),
	config = require('../config/environment'),
	async = require('async'),
	lol = require('lol-js'),
	lolClient = lol.client({
		apiKey: config.RIOT_API_KEY
	});

Match.addListener('created', function (matchInstance) {});

var loadMatchesFromRiot = function loadMatchesFromRiot(start, limit, callback) {
	Match.find({
			data: ''
		}, null, {
			skip: start,
			limit: limit
		},
		function (err, docs) {
			if (err) return console.error(err);

			// TODO: load data from rito
			async.eachSeries(docs, function (match, cb) {
				lolClient.getMatchAsync(match.id, {
					region: match.region.toLowerCase()
				}).then(function (data) {
					match.data = JSON.stringify(data);
					match.save(function (e) {
						if (e) return console.log(e);
						cb();
					});
				});
			}, function (err) {
				if (err) return console.error(err);
				if (callback === undefined)
					callback = loadMatchesFromRiot;
				callback(start + limit, limit, callback);
			});

		});
};

loadMatchesFromRiot(0, 100, loadMatchesFromRiot);