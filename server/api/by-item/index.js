'use strict';

var express = require('express');
var controller = require('./by-item.controller');

var router = express.Router();

router.get('/:itemId', controller.byItem);

module.exports = router;