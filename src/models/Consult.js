const mongoose = require('mongoose');
const mongooseHistory = require('mongoose-history');
const paginate = require('mongoose-paginate');
const mongoose_populate = require('mongoose-autopopulate');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

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
		observations: {
			type: String,
		},
		photos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Photo',
			},
		],
		//0 - Agendada 1 - Retorno 2 - Urgencia
		type_consult: {
			value: String,
			label: String,
		},
		anamnese: {
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
			pe_predominante: {
				value: String,
				label: String,
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
			medicamento: {
				option: {
					type: Boolean,
					default: false,
				},
				description: { type: String },
			},
			alergia: {
				option: {
					type: Boolean,
					default: false,
				},
				description: { type: String },
			},
			doenca: {
				option: {
					type: Boolean,
					default: false,
				},
				description: { type: String },
			},
			diabetico: {
				type: Boolean,
				default: false,
			},
			diabetico_familia: {
				type: Boolean,
				default: false,
			},
			hipertensao: {
				type: Boolean,
				default: false,
			},
			cardiopata: {
				type: Boolean,
				default: false,
			},
			fumante: {
				type: Boolean,
				default: false,
			},
			etilista: {
				type: Boolean,
				default: false,
			},
			dst: {
				type: Boolean,
				default: false,
			},
			grav_lact: {
				type: Boolean,
				default: false,
			},
			outros: {
				type: String,
			},
			motivo: {
				type: String,
			},
			unhas_formato: {
				normal: [
					{
						type: String,
					},
				],
				involuta: [
					{
						type: String,
					},
				],
				telha: [
					{
						type: String,
					},
				],
				funil: [
					{
						type: String,
					},
				],
				gancho: [
					{
						type: String,
					},
				],
				caracol: [
					{
						type: String,
					},
				],
				torques: [
					{
						type: String,
					},
				],
			},
			unhas_lesoes: {
				alter_cor: [
					{
						type: String,
					},
				],
				exostose: [
					{
						type: String,
					},
				],
				granuloma: [
					{
						type: String,
					},
				],
				onicoatrofia: [
					{
						type: String,
					},
				],
				onicocriptose: [
					{
						type: String,
					},
				],
				onicofose: [
					{
						type: String,
					},
				],
				onicogrifose: [
					{
						type: String,
					},
				],
				onicolise: [
					{
						type: String,
					},
				],
				onicomadese: [
					{
						type: String,
					},
				],
				onicomicose: [
					{
						type: String,
					},
				],
				onicorrexe: [
					{
						type: String,
					},
				],
				psoriase: [
					{
						type: String,
					},
				],
				outros: {
					type: String,
				},
			},
			pele_lesoes: {
				anidrose: [
					{
						type: String,
					},
				],
				bromidrose: [
					{
						type: String,
					},
				],
				calos: [
					{
						type: String,
					},
				],
				desidrose: [
					{
						type: String,
					},
				],
				fissuras: [
					{
						type: String,
					},
				],
				hiperhidrose: [
					{
						type: String,
					},
				],
				isquemis: [
					{
						type: String,
					},
				],
				mal_perfurante: [
					{
						type: String,
					},
				],
				psoriase: [
					{
						type: String,
					},
				],
				tinea_pedis: [
					{
						type: String,
					},
				],

				outros: { type: String },
			},
			orto_lesoes: {
				dedos_garra: [
					{
						type: String,
					},
				],
				esporao_calcaneo: [
					{
						type: String,
					},
				],
				halux_rigidus: [
					{
						type: String,
					},
				],
				halux_valgus: [
					{
						type: String,
					},
				],
				tipo_pe: [
					{
						type: String,
					},
				],
				tipos_de_pisada: [
					{
						type: String,
					},
				],
				tipos_dedos: [
					{
						type: String,
					},
				],
				tipos_joelhos: [
					{
						type: String,
					},
				],

				outros: { type: String },
			},
			joelhos_tipos: [
				{
					value: String,
					label: String,
				},
			],

			exame_fisico: {
				monofilamento: { type: String },
				diapasao: { type: String },
				digitopresao: { type: String },
				pulsos: { type: String },
			},
		},
		//{ value: 0, label: 'Marcada' }
		//{ value: 1, label: 'Realizada' }
		//{ value: 2, label: 'Cancelada' }
		status: {
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

ConsultSchema.plugin(mongooseHistory);

ConsultSchema.plugin(mongoose_populate);

ConsultSchema.virtual('photos_urls').get(function () {
	return this.photos.map((photo) => `http://localhost:3001/files/${photo}`);
});

ConsultSchema.virtual('dateLocal').get(function () {
	return {
		date: dayjs(this.date).local().format('DD/MM/YYYY HH:mm'),
		createdAt: dayjs(this.createdAt).local().format('DD/MM/YYYY HH:mm'),
		updatedAt: dayjs(this.updatedAt).local().format('DD/MM/YYYY HH:mm'),
	};
});

module.exports = mongoose.model('Consult', ConsultSchema);
