const Consult = require('../models/Consult');
const Photo = require('../models/Photo');
const stringToArray = require('../utils/StringToArray');

//TODO
// Ver filtro de uma consulta com mesmo paciente
// no mesmo horario
const create = async (req, res) => {
	//const { errors, isValid} = ValidateConsult(req.body)
	const { date, client, procedures, type_consult, observations, status } = req.body;

	let consult = await Consult.findOne({ date });

	if (consult) {
		return res.status(400).json({ path: 'date', message: 'Já existe consulta marcada nesta data/hora' });
	}

	let newConsult;

	try {
		newConsult = await Consult.create({
			date,
			client,
			procedures,
			type_consult,
			observations,
			status,
			createdBy: req.user,
		});
	} catch (error) {
		return res.json(error);
	}

	return res.status(201).json(newConsult);
};

const photos = async (req, res) => {
	const url = process.env.URL || 'http://localhost:3001';
	const consult = await Consult.findById(req.params.id);
	if (!consult) {
		return res.status(404).json({ message: 'Consulta não localizada!' });
	}
	const photo = await Photo.create({
		name: req.file.originalname,
		size: req.file.size,
		key: req.file.key,
		url: `${url}/files/${req.file.key}`,
	});
	consult.photos.push(photo);
	await consult.save();
	return res.json(receita);
};

const delete_photo = async (req, res) => {
	const { consult_id, photo_id } = req.params;

	const consult = await Consult.findById(consult_id);
	const photo = await Photo.findById(photo_id);
	await photo.remove();
	await consult.photos.pull(photo_id);
	await consult.save();
	return res.json(consult);
};

const update = async (req, res) => {
	//const { errors, isValid} = ValidateConsult(req.body)
	const { date, client, procedures, type_consult, anamnese, observations } = req.body;
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
			updatedBy: req.user,
		},
		{ new: true }
	)
		.then((doc) => res.json(doc))
		.catch((error) => res.json(error));
};

const filter = async (req, res) => {
	const { search } = req.query;
	consults = await Consult.find({ client: { name: { $regex: search, $options: 'i' } } });
	return res.json(consults);
};

const retrieve = async (req, res) => {
	const { id } = req.params;

	const consult = await Consult.findById(id);

	if (!consult) {
		return res.status(404).json('Consulta não localizada');
	}

	return res.json(consult);
};

const list = async (req, res) => {
	const { dateI, dateF, status, client } = req.query;

	let condition = {};
	let consults = [];

	if (dateI !== undefined && dateF !== undefined) {
		condition.date = {
			$gte: new Date(new Date(dateI).setHours(00, 00, 00)),
			$lte: new Date(new Date(dateF).setHours(23, 59, 59)),
		};
	}

	// Consult.find(condition)
	// 	.populate({ path: 'client', match: { name: { $regex: client } }, select: 'name' })
	// 	.exec((error, consults) => {
	// 		if (error) {
	// 			return res.json(error);
	// 		}
	// 		return res.json(consults);
	// 	});
	try {
		consults = await Consult.find(condition).sort({ date: -1 }).limit(200);
	} catch (error) {
		return res.json(error);
	}
	return res.json(consults);
};

module.exports = { create, update, retrieve, list, filter, photos, delete_photo };
