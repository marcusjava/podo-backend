const mongoose = require('mongoose');
const User = require('./User');

const mongoose_populate = require('mongoose-autopopulate');

const ServiceSchema = mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
		},
		observations: {
			type: String,
		},
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
		timestamps: true,
	}
);

ServiceSchema.plugin(mongoose_populate);

module.exports = mongoose.model('Service', ServiceSchema);
