const mongoose = require('mongoose');
const Service = require('./Service');

const User = require('./User');

const mongooseHistory = require('mongoose-history');

const mongoose_populate = require('mongoose-autopopulate');

const ProcedureSchema = mongoose.Schema(
	{
		photos: [
			{
				type: String,
			},
		],
		service: {
			type: mongoose.Types.ObjectId,
			ref: Service,
			autopopulate: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
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
		toJSON: {
			virtuals: true,
		},
		timestamps: true,
	}
);

ProcedureSchema.plugin(mongooseHistory);

ProcedureSchema.plugin(mongoose_populate);

ProcedureSchema.virtual('photos_urls').get(function() {
	return this.photos.map(photo => `http://localhost:3001/files/${photo}`);
});

module.exports = mongoose.model('Procedure', ProcedureSchema);
