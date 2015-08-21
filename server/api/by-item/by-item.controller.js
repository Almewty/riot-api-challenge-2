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
	Participant.aggregate([{
			$match: {
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
			}
	}, {
			$group: {
				_id: '$patch'
			}
		}],
		function (err, data) {
			if (err) return handleError(res, err);
			return res.status(200).json(data);
		});
};

function handleError(res, err) {
	return res.status(500).send(err);
}