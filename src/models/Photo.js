const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const History = require('./ConsultHistory');

const PhotoSchema = new mongoose.Schema(
	{
		name: String,
		consult: {
			type: mongoose.Types.ObjectId,
			ref: 'Consult',
		},
		size: Number,
		key: String,
		url: String,
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		updatedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
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

PhotoSchema.post('save', async function (doc) {
	await History.create({
		o: 'i',
		docId: doc.consult._id,
		d: doc,
	});
});

PhotoSchema.post('remove', async function (doc) {
	console.log(doc);
	await History.create({
		o: 'r',
		docId: doc.consult._id,
		d: doc,
	});
});

module.exports = mongoose.model('Photo', PhotoSchema);
