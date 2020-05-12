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
			photos: req.files.map((thumbnail) => thumbnail.filename),
			service,
			name,
			description,
			createdBy: req.user,
		});
	} catch (error) {
		let errorMessages;
		const { type, path } = error.errors.description.properties;
		if (type === 'required' && path === 'description') {
			errorMessages = { path: 'description', message: 'Campo descrição é obrigatorio' };
		}

		return res.status(400).json(errorMessages);
	}

	return res.status(201).json(newProcedure);
};

const update = async (req, res) => {
	//const { errors, isValid} = ValidateProcedure(req.body)

	const { service, name, description } = req.body;
	const { id } = req.params;

	Procedure.findById({ _id: id })
		.then((doc) => {
			if (!doc) {
				return res.status(404).json({ message: 'Procedimento não localizado' });
			}
			doc.photos = [...doc.photos, ...req.files.map((thumbnail) => thumbnail.filename)];
			doc.service = service;
			doc.name = name;
			doc.description = description;
			doc.updatedBy = req.user;

			doc.save();
			return res.json(doc);
		})
		.catch((error) => res.status(400).json(error));
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
			photos: procedure.photos.filter((p) => p !== photo),
			updatedBy: req.user,
		},
		{ new: true }
	)
		.then((procedure) => {
			fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', photo));
			res.json(procedure);
		})
		.catch((error) => res.status(400).json(error));
};

const list = async (req, res) => {
	const list = await Procedure.find({}).sort({ createdAt: -1 }).limit(100);
	return res.json(list);
};

module.exports = { create, update, list, deletePhoto };
