var Match = require('../api/match/match.model'),
	Participant = require('../api/participant/participant.model'),
	config = require('../config/environment'),
	async = require('async'),
	_ = require('underscore'),
	lol = require('lol-js'),
	lolClient = lol.client({
		apiKey: config.RIOT_API_KEY
	});

var matchProps = _.keys(Match.schema.paths);
var participantProps = _.keys(Participant.schema.paths);

var loadDataFromRiot = function loadDataFromRiot(match, callback) {
	// load match data from riot api
	lolClient.getMatch(match.id, {
		region: match.region.toLowerCase()
	}, function (err, data) {
		if (err) return callback(err);
		// mark as loaded
		match.loaded = true;
		for (var key in data) {
			// set keys available in schema
			if (key !== 'participants' && matchProps.indexOf(key) >= 0) {
				match[key] = data[key];
			}
		}
		async.each(data.participants, function (part, cb) {
			var p = new Participant();
			for (var pKey in part) {
				if (participantProps.indexOf(pKey) >= 0) {
					p[pKey] = part[pKey];
				}
			}
			for (var i = 0; i < matchProps.length; i++) {
				var mKey = matchProps[i];
				if (mKey === '_id' || mKey === '__v')
					continue;
				if (participantProps.indexOf(mKey) >= 0) {
					p[mKey] = match[mKey];
				}
			}
			p.save(function (err) {
				match.participants.push(p._id);
				cb();
			});
		}, function (err) {
			if (err) return callback(err);
			match.save(callback);
		});
	});

};

var loadMatchesFromRiot = function loadMatchesFromRiot(limit, callback) {
	Match.find({
			loaded: false
		}, null, {
			skip: 0,
			limit: limit
		},
		function (err, docs) {
			if (err) return callback(err);
			if (docs.length === 0) {
				return callback("no docs found");
			}

			async.eachSeries(docs, function (match, cb) {
				loadDataFromRiot(match, cb);
			}, function (err) {
				if (err) return callback(err);
				callback();
			});
		});
};

var startCron = function startCron() {
	loadMatchesFromRiot(100, function (err) {
		if (err) console.error(err);
		setTimeout(startCron, 5000);
	});
};

startCron();