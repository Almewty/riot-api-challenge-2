/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Participant = require('./participant.model');

exports.byItem = function (req, res) {
	var offset = req.query.offset || 0;
	var size = 500;
	var itemId = Number(req.params.itemId);
	if (isNaN(itemId))
		return handleError(res, "Bad id");
	Participant.find({
		$or: [{
				'stats.item0': itemId
		},
			{
				'stats.item1': itemId
			},
			{
				'stats.item2': itemId
			},
			{
				'stats.item3': itemId
			},
			{
				'stats.item4': itemId
			},
			{
				'stats.item5': itemId
			},
			{
				'stats.item6': itemId
			}]

	}).sort({
		_id: -1
	}).exec(function (err, participants) {
		if (err) return handleError(res, err);
		return res.status(200).json(participants);
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
}