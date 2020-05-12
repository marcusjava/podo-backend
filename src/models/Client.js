const mongoose = require('mongoose');
const mongooseHistory = require('mongoose-history');
const mongoose_populate = require('mongoose-autopopulate');
const uniqueValidator = require('mongoose-unique-validator');

const ClientSchema = new mongoose.Schema(
	{
		avatar: { type: String },
		name: {
			type: String,
			required: true,
		},
		instagram: {
			type: String,
		},
		cpf: { type: String, unique: true },
		rg: { type: String },
		email: {
			type: String,
			unique: true,
			trim: true,
			match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		},
		address: {
			street: { type: String },
			neighborhood: { type: String },
			city: { type: String },
			state: { type: String },
			cep: { type: String },
		},

		occupation: { type: String },
		contact: { type: String },
		nasc: { type: String },
		sex: {
			value: String,
			label: String,
		},
		etnia: {
			value: String,
			label: String,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			autopopulate: true,
		},
		updatedBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			autopopulate: true,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		timestamps: true,
	}
);

ClientSchema.virtual('avatar_url').get(function () {
	return `http://localhost:3001/files/${this.avatar}`;
});

ClientSchema.virtual('insta_url').get(function () {
	return `https://www.instagram.com/${this.instagram}`;
});

ClientSchema.plugin(mongooseHistory);

ClientSchema.plugin(uniqueValidator, { '{PATH}': 'Erro, já existe {PATH} cadastrado no sistema.' });

ClientSchema.plugin(mongoose_populate);

module.exports = mongoose.model('Client', ClientSchema);
