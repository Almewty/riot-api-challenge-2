'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
	region: String,
	type: String,
	patch: String,

	championId: Number,
	highestAchievedSeasonTier: String,
	spell1Id: Number,
	spell2Id: Number,
	stats: Schema.Types.Mixed
});

module.exports = mongoose.model('Participant', ParticipantSchema);