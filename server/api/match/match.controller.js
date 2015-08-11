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
	Match.find(function (err, things) {
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

function handleError(res, err) {
	return res.status(500).send(err);
}