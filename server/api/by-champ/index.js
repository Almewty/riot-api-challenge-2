'use strict';

var express = require('express');
var controller = require('./by-champ.controller');

var router = express.Router();

router.get('/:champId', controller.byChamp);

module.exports = router;