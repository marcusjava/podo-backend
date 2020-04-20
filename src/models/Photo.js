const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const PhotoSchema = new mongoose.Schema(
	{
		name: String,
		size: Number,
		key: String,
		url: String,
		description: String,
	},
	{ timestamps: true }
);

PhotoSchema.pre('save', function () {
	if (!this.url) {
		this.url = `${process.env.APP_URL}/files/${this.key}`;
	}
});

PhotoSchema.pre('remove', function () {
	return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', this.key));
});

module.exports = mongoose.model('Photo', PhotoSchema);
