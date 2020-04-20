const Procedure = require('../models/Procedure');
const fs = require('fs');
const path = require('path');

const create = async (req, res) => {
	//const { errors, isValid} = ValidateProcedure(req.body)

	const { service, name, description } = req.body;

	const procedure = await Procedure.findOne({ name });

	if (procedure) {
		return res.status(400).json({ error: 'Procedimento ja cadastrado' });
	}

	let newProcedure;

	try {
		newProcedure = await Procedure.create({
			photos: req.files.map(thumbnail => thumbnail.filename),
			service,
			name,
			description,
			createdBy: req.user,
		});
	} catch (error) {
		return res.json(error);
	}

	return res.status(201).json(newProcedure);
};

const update = async (req, res) => {
	//const { errors, isValid} = ValidateProcedure(req.body)

	const { service, name, description } = req.body;
	const { id } = req.params;

	const procedure = await Procedure.findById({ _id: id });

	if (!procedure) {
		return res.status(404).json({ error: 'Procedimento não localizado' });
	}

	Procedure.findByIdAndUpdate(
		{ _id: id },
		{
			photos: [...procedure.photos, ...req.files.map(thumbnail => thumbnail.filename)],
			service,
			name,
			description,
			updatedBy: req.user,
		},
		{ new: true }
	)
		.then(procedure => res.json(procedure))
		.catch(error => res.status(400).json(error));
};

const filter = async (req, res) => {
	const { search } = req.query;
	procedures = await Procedure.find({ name: { $regex: search, $options: 'i' } });
	return res.json(procedures);
};

const deletePhoto = async (req, res) => {
	const { id } = req.params;

	const { photo } = req.body;

	const procedure = await Procedure.findById({ _id: id });

	if (!procedure) {
		return res.status(404).json({ error: 'Procedimento não localizado' });
	}

	Procedure.findByIdAndUpdate(
		{ _id: id },
		{
			photos: procedure.photos.filter(p => p !== photo),
			updatedBy: req.user,
		},
		{ new: true }
	)
		.then(procedure => {
			fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', photo));
			res.json(procedure);
		})
		.catch(error => res.status(400).json(error));
};

const list = async (req, res) => {
	const list = await Procedure.find({})
		.sort({ createdAt: -1 })
		.limit(100);
	return res.json(list);
};

module.exports = { create, update, list, deletePhoto, filter };
