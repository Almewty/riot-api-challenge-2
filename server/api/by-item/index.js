'use strict';

var express = require('express');
var controller = require('./by-item.controller');
var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({
	store: 'memory',
	max: 1000000000000000000
});

var router = express.Router();

function responder(res) {
	return function respond(err, data) {
		if (err) return handleError(res, err);
		else res.status(200).json(data);
	}
}

function byItemCached(req, res) {
	var cacheKey = 'item_' + req.params.itemId;
	memoryCache.wrap(cacheKey, function (cacheCb) {
		controller.byItem(req, cacheCb);
	}, responder(res));
}

function handleError(res, err) {
	return res.status(500).send(err);
}

router.get('/:itemId', byItemCached);

module.exports = router;