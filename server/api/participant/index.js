'use strict';

var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.get('/by-item/:itemId', controller.byItem);
router.get('/:patch/by-item/:itemId', controller.byItem);

module.exports = router;