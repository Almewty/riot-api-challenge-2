'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MatchSchema = new Schema({
	id: Number,
	region: String,
	type: String,
	patch: String,
	loaded: Boolean,

	matchId: Number,
	matchCreation: Number,
	matchDuration: Number,
	mapId: Number,
	matchVersion: String,
	participants: [{
		type: Schema.Types.ObjectId,
		ref: 'Participant'
	}]
});


module.exports = mongoose.model('Match', MatchSchema);