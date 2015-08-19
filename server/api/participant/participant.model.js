'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
	championId: Number,
	highestAchievedSeasonTier: String,
	spell1Id: Number,
	spell2Id: Number,
	lane: String,
	winner: Boolean,
	champLevel: Number,
	item0: Number,
	item1: Number,
	item2: Number,
	item3: Number,
	item4: Number,
	item5: Number,
	item6: Number,
	kills: Number,
	deaths: Number,
	assists: Number,
	doubleKills: Number,
	tripleKills: Number,
	quadraKills: Number,
	pentaKills: Number,
	minionsKilled: Number,
	goldEarned: Number,
	goldSpent: Number,
	goldLeft: Number,
	magicDamageDealtToChampions: Number,
	physicalDamageDealtToChampions: Number,
	trueDamageDealtToChampions: Number,
	magicDamageDealt: Number,
	physicalDamageDealt: Number,
	trueDamageDealt: Number,
	magicDamageTaken: Number,
	physicalDamageTaken: Number,
	trueDamageTaken: Number
});

module.exports = mongoose.model('Participant', ParticipantSchema);