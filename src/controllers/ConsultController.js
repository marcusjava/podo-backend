const Consult = require('../models/Consult');
const Client = require('../models/Client');
const ConsultHistory = require('../models/ConsultHistory');

//TODO
// Ver filtro de uma consulta com mesmo paciente
// no mesmo horario
// DESCONSIDERAR SE A CONSULTA ESTIVER COM STATUS CANCELADA
const create = async (req, res, next) => {
	//const { errors, isValid} = ValidateConsult(req.body)
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
		return next({ status: 400, message: error });
	}
};

/**
 *
 * @param {id} req
 * @param {*} res
 *
 * TODO
 * - Verificar se ao atualizar a consulta SE NAO EXSITE UMA OUTRA NO MESMO HORARIO
 */

const update = async (req, res, next) => {
	const { date, client, procedures, type_consult, anamnese, observations, status } = req.body;
	const { id } = req.params;

	Consult.findByIdAndUpdate(
		{ _id: id },
		{
			date: date,
			client: client,
			procedures: procedures,
			type_consult: type_consult,
			anamnese: anamnese,
			observations: observations,
			status: status,
			updatedBy: req.user,
		},
		{ new: true, useFindAndModify: false }
	)
		.then((doc) => {
			if (!doc) {
				return next({ status: 404, message: { message: 'Consulta não localizada' } });
			}
			return res.json(doc);
		})
		.catch((error) => {
			return next({ status: 400, message: { message: error } });
		});
};

const retrieve = async (req, res, next) => {
	const { id } = req.params;

	const consult = await Consult.findById(id);

	if (!consult) {
		return next({ status: 404, message: { message: 'Consulta não localizada' } });
	}

	return res.json(consult);
};

const list = async (req, res, next) => {
	const { start, end, status, client, client_id } = req.query;

	let condition = {};
	let clients;

	condition.date = {
		$gte: new Date().setHours(00, 00, 00),
	};

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
		console.log(client_id);
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
				return next({ status: 400, message: { message: 'Erro ao recuperar os logs da consulta' } });
			}
			return res.json(logs);
		});
};

module.exports = { create, update, retrieve, list, log };
