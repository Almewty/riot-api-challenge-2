'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var participantSchema = require('../participant/participant.model');

var MatchSchema = new Schema({
	id: Number,
	data: String,
	region: String,
	type: String,
	patch: String,

	matchId: Number,
	matchCreation: Number,
	matchDuration: Number,
	mapId: Number,
	matchVersion: String,
	participants: [participantSchema]
});

MatchSchema.post('save', function (next) {
	var model = this.model(this.constructor.modelName);
	model.emit('created', this);
})

module.exports = mongoose.model('Match', MatchSchema);