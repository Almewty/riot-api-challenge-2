'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MatchSchema = new Schema({
	id: Number,
	data: String,
	region: String
});

module.exports = mongoose.model('Match', MatchSchema);