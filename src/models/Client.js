const mongoose = require('mongoose');
const mongooseHistory = require('mongoose-history');
const paginate = require('mongoose-paginate');
const mongoose_populate = require('mongoose-autopopulate');

const User = require('./User');

const ClientSchema = new mongoose.Schema(
	{
		avatar: { type: String },
		name: {
			type: String,
			required: true,
		},
		cpf: { type: String, unique: true, match: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ },
		rg: { type: String },
		email: {
			type: String,
			unique: true,
			trim: true,
			match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		},
		address: {
			type: String,
		},
		district: { type: String },
		state: { type: String },
		cep: { type: String },
		occupation: { type: String },
		contact: { type: String },
		nasc: { type: String },
		sex: { type: String },
		etnia: { type: String },
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: User,
			autopopulate: true,
		},
		updatedBy: {
			type: mongoose.Types.ObjectId,
			ref: User,
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

ClientSchema.virtual('avatar_url').get(function() {
	return `http://localhost:3001/files/${this.avatar}`;
});

ClientSchema.plugin(mongooseHistory);

ClientSchema.plugin(mongoose_populate);

ClientSchema.plugin(paginate);

module.exports = mongoose.model('Client', ClientSchema);
