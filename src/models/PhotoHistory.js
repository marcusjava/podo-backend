const mongoose = require('mongoose');

const PhotoHistory = new mongoose.Schema({
	t: {
		type: Date,
		default: Date.now(),
	},
	o: {
		type: String,
		enum: ['i', 'u', 'r'],
	},
	d: {},
});
module.exports = mongoose.model('photo_history', PhotoHistory);
