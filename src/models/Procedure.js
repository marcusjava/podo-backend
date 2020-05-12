const mongoose = require('mongoose');

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
			ref: 'Service',
			autopopulate: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
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

ProcedureSchema.plugin(mongooseHistory);

ProcedureSchema.plugin(mongoose_populate);

ProcedureSchema.virtual('photos_urls').get(function () {
	return this.photos.map((photo) => `http://localhost:3001/files/${photo}`);
});

// FotoSchema.pre('remove', function() {
// 	console.log('Pré remove fired!!!!!!', this.key);
// 	return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', this.key));
// });

module.exports = mongoose.model('Procedure', ProcedureSchema);
