'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
	championId: Number,
	highestAchievedSeasonTier: String,
	spell1Id: Number,
	spell2Id: Number,
	stats: Schema.Types.Mixed,
	match: {
		type: Schema.Types.ObjectId,
		ref: 'Match'
	}
});

module.exports = mongoose.model('Participant', ParticipantSchema);