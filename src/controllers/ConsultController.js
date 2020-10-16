const Consult = require('../models/Consult');
const Client = require('../models/Client');
const ConsultHistory = require('../models/ConsultHistory');
const ValidateConsult = require('../validation/consult');

const DeleteFile = require('../utils/DeleteFile');

//TODO
// Ver filtro de uma consulta com mesmo paciente
// no mesmo horario
// DESCONSIDERAR SE A CONSULTA ESTIVER COM STATUS CANCELADA
const create = async (req, res, next) => {
	const { errors, isValid } = ValidateConsult(req.body);

	if (!isValid) {
		return next({ status: 400, message: errors });
	}
	const { date, client, procedures, type_consult, observations, status } = req.body;

	let consult = await Consult.findOne({ date });

	if (consult) {
		return next({ status: 400, message: { path: 'date', message: 'Já existe consulta marcada nesta data/hora' } });
	}

	try {
		const newConsult = await Consult.create({
			date,
			client,
			procedures,
			type_consult,
			observations,
			status,
			createdBy: req.user,
		});
		return res.status(201).json(newConsult);
	} catch (error) {
		return next({
			status: 400,
			message: { path: 'general', message: 'Ocorreu um erro ao salvar a consulta' },
			error,
		});
	}
};

const update = async (req, res, next) => {
	const { errors, isValid } = ValidateConsult(req.body);

	if (!isValid) {
		return next({ status: 400, message: errors });
	}
	const { date, client, procedures, type_consult, anamnese, observations, status } = req.body;
	const { id } = req.params;

	Consult.findByIdAndUpdate(
		{ _id: id },
		{
			date,
			client,
			procedures,
			type_consult,
			anamnese,
			observations,
			status,
			updatedBy: req.user,
		},
		{ new: true, useFindAndModify: false }
	)
		.then((doc) => {
			if (!doc) {
				return next({ status: 404, message: { path: 'general', message: 'Consulta não localizada' } });
			}
			return res.json(doc);
		})
		.catch((error) => {
			return next({
				status: 400,
				message: { path: 'general', message: 'Ocorreu um erro ao atualizar a consulta', error },
			});
		});
};

const deletePhoto = async (req, res, next) => {
	const { id, photo_id } = req.params;

	const consult = await Consult.findById({ _id: id });

	const photo = consult.photos.filter((photo) => photo._id == photo_id);

	Consult.findByIdAndUpdate({ _id: id }, { $pull: { photos: { _id: photo_id } } }, { new: true })
		.then((doc) => {
			DeleteFile(photo[0].key);

			return res.status(200).json(doc);
		})
		.catch((error) =>
			next({ status: 400, message: { path: 'general', message: 'Ocorreu um erro ao excluir a foto', error } })
		);
};

const savePhotos = async (req, res, next) => {
	const { id } = req.params;

	const consult = await Consult.findById(id);

	if (consult.photos.length >= 9) {
		return next({ status: 500, message: { path: 'general', message: 'Limite maximo de fotos excedido' } });
	}

	const newPhotos = req.files.map((file) => ({
		name: file.originalname,
		size: file.size,
		key: file.key,
		url:
			process.env.NODE_ENV === 'development'
				? `http://localhost:3001/files/${file.key}`
				: `https://podobucket.s3.us-east-2.amazonaws.com/${file.key}`,
	}));

	consult.photos = [...consult.photos, ...newPhotos];

	await consult.save();
	return res.status(200).json(consult);
};

const retrieve = async (req, res, next) => {
	const { id } = req.params;

	const consult = await Consult.findById(id);

	if (!consult) {
		return next({ status: 404, message: { path: 'general', message: 'Consulta não localizada' } });
	}

	return res.json(consult);
};

const list = async (req, res, next) => {
	const { start, end, status, client, client_id, all } = req.query;

	let condition = {};
	let clients;

	if (!all) {
		condition.date = {
			$gte: new Date(new Date(Date.now()).setHours(00, 00, 00)),
		};
	}

	if (start !== undefined && end !== undefined) {
		condition.date = {
			$gte: new Date(new Date(start).setHours(00, 00, 00)),
			$lte: new Date(new Date(end).setHours(23, 59, 59)),
		};
	}

	if (client !== undefined) {
		clients = await Client.find({ name: { $regex: client, $options: 'i' } });
		condition.client = { $in: clients };
	}
	if (client_id !== undefined) {
		condition.client = { _id: client_id };
	}

	Consult.find(condition)
		.sort({ date: 1 })
		.limit(200)
		.exec((error, consults) => {
			if (error) {
				return next({ status: 400, message: { message: error } });
			}

			return res.json(consults);
		});
};

const log = async (req, res, next) => {
	const { start, end } = req.query;
	const { id } = req.params;
	let condition = {};

	if (start !== undefined && end !== undefined) {
		condition.t = {
			$gte: new Date(new Date(start).setHours(00, 00, 00)),
			$lte: new Date(new Date(end).setHours(23, 59, 59)),
		};
	}

	if (id !== undefined) {
		condition.docId = id;
	}

	ConsultHistory.find(condition)
		.sort({ t: 1 })
		.limit(200)
		.exec((error, logs) => {
			if (error) {
				return next({ status: 400, message: { message: 'Erro ao recuperar os logs da consulta' }, error });
			}
			return res.json(logs);
		});
};

module.exports = { create, update, retrieve, list, log, savePhotos, deletePhoto };
