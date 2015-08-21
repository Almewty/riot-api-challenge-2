/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var Match = require('./match.model');

// Get list of things
exports.index = function (req, res) {
	var offset = req.query.offset || 0;
	var size = /*req.query.size || */ 500;
	var query = Match.find({});
	query.limit(size);
	query.skip(offset);
	query.exec(function (err, things) {
		if (err) {
			return handleError(res, err);
		}
		return res.status(200).json(things);
	});
};

// Get a single thing
exports.show = function (req, res) {
	Match.findById(req.params.id, function (err, thing) {
		if (err) {
			return handleError(res, err);
		}
		if (!thing) {
			return res.status(404).send('Not Found');
		}
		return res.json(thing);
	});
};

exports.byItem = function (req, res) {
	var itemId = req.params.itemId;
	if (isNaN(itemId))
		return handleError(res, "Bad item id");
	itemId = Number(itemId);
	Match.aggregate([
			{
				$match: {
					loaded: true
				}
			}, {
				$unwind: '$participants'
			}, {
				$match: {
					$or: [{
						'participants.stats.item0': itemId
			}, {
						'participants.stats.item1': itemId
			}, {
						'participants.stats.item2': itemId
			}, {
						'participants.stats.item3': itemId
			}, {
						'participants.stats.item4': itemId
			}, {
						'participants.stats.item5': itemId
			}, {
						'participants.stats.item6': itemId
			}]
				}
			}],
		function (err, result) {
			//			console.log(result);
			res.status(200).json(result);
		});
};

function handleError(res, err) {
	return res.status(500).send(err);
}