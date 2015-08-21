/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * GET     /things/:id          ->  show
 */

'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Match = require('../match/match.model');

exports.byItem = function (req, res) {
	var offset = req.query.offset || 0;
	var size = 500;
	var itemId = Number(req.params.itemId);
	if (isNaN(itemId))
		return handleError(res, "Bad id");


};

function handleError(res, err) {
	return res.status(500).send(err);
}