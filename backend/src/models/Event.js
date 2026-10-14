const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	event: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
	sessionId: {
		type: String,
		required: true,
		index: true
	},
	pageX: Number,
	pageY: Number
});

module.exports = mongoose.model('Event', eventSchema);
