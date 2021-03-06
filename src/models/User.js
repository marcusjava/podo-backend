const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema(
	{
		thumbnail: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		nasc: {
			type: String,
		},
		cpf: { type: String, required: true, unique: true },
		rg: { type: String },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		},
		address: {
			street: { type: String, required: true },
			neighborhood: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			cep: { type: String, default: '49000-000' },
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: {
			Administrador: Boolean,
			Usuario: Boolean,
		},
		status: {
			label: String,
			value: String,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		timestamps: true,
	}
);

UserSchema.virtual('avatar_url').get(function () {
	return process.env.NODE_ENV == 'development'
		? `http://localhost:3001/files/${this.thumbnail}`
		: `https://podobucket.s3.us-east-2.amazonaws.com/${this.thumbnail}`;
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
