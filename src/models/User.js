const mongoose = require('mongoose');
const mongooseHistory = require('mongoose-history');

const UserSchema = mongoose.Schema(
	{
		avatar: {
			type: String,
		},
		name: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		role: [
			{
				type: String,
				default: 'Administrador',
			},
		],
		status: {
			type: String,
			default: '0',
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
		timestamps: true,
	}
);

UserSchema.virtual('avatar_url').get(function() {
	return `http://localhost:3001/files/${this.avatar}`;
});

UserSchema.plugin(mongooseHistory);

module.exports = mongoose.model('User', UserSchema);
