const mongoose = require('mongoose');
const mongoose_populate = require('mongoose-autopopulate');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const History = require('./ConsultHistory');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const aws = require('aws-sdk');

const s3 = new aws.S3();

dayjs.extend(utc);

const ConsultSchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		client: {
			type: mongoose.Types.ObjectId,
			ref: 'Client',
			autopopulate: true,
		},
		procedures: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Procedure',
				autopopulate: true,
			},
		],
		photos: [
			{
				name: String,
				size: Number,
				key: String,
				url: String,
			},
		],
		observations: {
			type: String,
		},
		//0 - Agendada 1 - Retorno 2 - Urgencia
		type_consult: {
			value: String,
			label: String,
		},
		anamnese: {
			alergia: {
				option: {
					type: Boolean,
					default: false,
				},
				description: { type: String },
			},
			calcado: {
				num: {
					type: String,
				},
				tipo: {
					value: String,
					label: String,
				},
				material: {
					value: String,
					label: String,
				},
			},
			cardiopata: {
				type: Boolean,
				default: false,
			},
			desc_proc: { type: String },
			diabetico: {
				type: Boolean,
				default: false,
			},
			diabetico_familia: {
				type: Boolean,
				default: false,
			},

			doenca: {
				option: {
					type: Boolean,
					default: false,
				},
				description: { type: String },
			},
			dst: {
				type: Boolean,
				default: false,
			},
			esporte: {
				option: {
					type: Boolean,
					default: false,
				},
				qt: {
					value: String,
					label: String,
				},
			},
			etilista: {
				type: Boolean,
				default: false,
			},

			exame_fisico: {
				monofilamento: { type: String },
				diapasao: { type: String },
				digitopressao: { type: String },
				pulsos: { type: String },
			},
			fumante: {
				type: Boolean,
				default: false,
			},
			grav_lact: {
				type: Boolean,
				default: false,
			},

			hipertensao: {
				type: Boolean,
				default: false,
			},
			medicamento: {
				option: {
					type: Boolean,
					default: false,
				},
				description: { type: String },
			},
			motivo: {
				type: String,
			},
			orto_lesoes: {
				dedos_garra: [
					{
						value: String,
						label: String,
					},
				],
				esporao_calcaneo: [
					{
						value: String,
						label: String,
					},
				],
				halux_rigidus: [
					{
						value: String,
						label: String,
					},
				],
				halux_valgus: [
					{
						value: String,
						label: String,
					},
				],
				tipo_pe: [
					{
						value: String,
						label: String,
					},
				],
				tipos_de_pisada: [
					{
						value: String,
						label: String,
					},
				],
				tipos_dedos: {
					value: String,
					label: String,
				},
				tipos_joelho: {
					value: String,
					label: String,
				},

				outros: { type: String },
			},
			pe_predominante: {
				value: String,
				label: String,
			},
			pele_lesoes: {
				anidrose: [
					{
						value: String,
						label: String,
					},
				],
				bromidrose: [
					{
						value: String,
						label: String,
					},
				],
				calos: [
					{
						value: String,
						label: String,
					},
				],
				desidrose: [
					{
						value: String,
						label: String,
					},
				],
				fissuras: [
					{
						value: String,
						label: String,
					},
				],
				hiperhidrose: [
					{
						value: String,
						label: String,
					},
				],
				isquemia: [
					{
						value: String,
						label: String,
					},
				],
				mal_perfurante: [
					{
						value: String,
						label: String,
					},
				],
				psoriase: [
					{
						value: String,
						label: String,
					},
				],
				tinea_pedis: [
					{
						value: String,
						label: String,
					},
				],

				outros: { type: String },
			},
			unhas_formato: {
				normal: [
					{
						value: String,
						label: String,
					},
				],
				involuta: [
					{
						value: String,
						label: String,
					},
				],
				telha: [
					{
						value: String,
						label: String,
					},
				],
				funil: [
					{
						value: String,
						label: String,
					},
				],
				gancho: [
					{
						value: String,
						label: String,
					},
				],
				caracol: [
					{
						value: String,
						label: String,
					},
				],
				torques: [
					{
						value: String,
						label: String,
					},
				],
			},
			unhas_lesoes: {
				alter_cor: [
					{
						value: String,
						label: String,
					},
				],
				exostose: [
					{
						value: String,
						label: String,
					},
				],
				granuloma: [
					{
						value: String,
						label: String,
					},
				],
				onicoatrofia: [
					{
						value: String,
						label: String,
					},
				],
				onicocriptose: [
					{
						value: String,
						label: String,
					},
				],
				onicofose: [
					{
						value: String,
						label: String,
					},
				],
				onicogrifose: [
					{
						value: String,
						label: String,
					},
				],
				onicolise: [
					{
						value: String,
						label: String,
					},
				],
				onicomadese: [
					{
						value: String,
						label: String,
					},
				],
				onicomicose: [
					{
						value: String,
						label: String,
					},
				],
				onicorrexe: [
					{
						value: String,
						label: String,
					},
				],
				psoriase: [
					{
						value: String,
						label: String,
					},
				],
				outros: {
					type: String,
				},
			},

			outros: {
				type: String,
			},

			joelhos_tipos: [
				{
					value: String,
					label: String,
				},
			],
		},
		//{ value: 0, label: 'Marcada' }
		//{ value: 1, label: 'Realizada' }
		//{ value: 2, label: 'Cancelada' }
		//{ value: 3, label: 'Remarcada' }
		status: {
			value: String,
			label: String,
		},

		finishDate: {
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

ConsultSchema.post('save', async (doc) => {
	await History.create({
		o: 'i',
		docId: doc._id,
		d: doc,
	});
});

ConsultSchema.pre('save', function () {
	if (!this.url) {
		this.url = `${process.env.APP_URL}/files/${this.key}`;
	}
});

ConsultSchema.pre('remove', function () {
	if (process.env.STORAGE_TYPE === 's3') {
		return s3
			.deleteObject({
				Bucket: 'podobucket',
				Key: this.key,
			})
			.promise();
	} else {
		return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', this.key));
	}
});

ConsultSchema.post('findOneAndUpdate', async (doc) => {
	await History.create({
		o: 'u',
		docId: doc._id,
		d: doc,
	});
});

ConsultSchema.plugin(mongoose_populate);

module.exports = mongoose.model('Consult', ConsultSchema);
