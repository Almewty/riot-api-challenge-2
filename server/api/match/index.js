'use strict';

var express = require('express');
var controller = require('./match.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

router.get('/by-item/:itemId', controller.byItem);

module.exports = router;