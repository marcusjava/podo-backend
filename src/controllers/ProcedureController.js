const Procedure = require('../models/Procedure');
const fs = require('fs');
const path = require('path');

const create = async (req, res, next) => {
	//const { errors, isValid} = ValidateProcedure(req.body)

	const { service, name, description } = req.body;

	if (!service) {
		return next({ status: 400, message: { path: 'service', message: 'Campo serviço é obrigatorio' } });
	}

	if (!name) {
		return next({ status: 400, message: { path: 'name', message: 'Campo nome é obrigatorio' } });
	}

	const procedure = await Procedure.findOne({ name });

	if (procedure) {
		return next({ status: 400, message: { path: 'name', message: 'Procedimento ja cadastrado' } });
	}

	let newProcedure;

	try {
		newProcedure = await Procedure.create({
			service,
			name,
			description,
			createdBy: req.user,
		});
	} catch (error) {
		return next({ status: 400, message: error });
	}

	return res.status(201).json(newProcedure);
};

const update = async (req, res, next) => {
	//const { errors, isValid} = ValidateProcedure(req.body)

	const { service, name, description } = req.body;
	const { id } = req.params;

	if (!service) {
		return next({ status: 400, message: { path: 'service', message: 'Campo serviço é obrigatorio' } });
	}

	if (!name) {
		return next({ status: 400, message: { path: 'name', message: 'Campo nome é obrigatorio' } });
	}

	Procedure.findById({ _id: id })
		.then((doc) => {
			if (!doc) {
				return next({ status: 404, message: { path: 'procedure', message: 'Procedimento não localizado' } });
			}
			doc.service = service;
			doc.name = name;
			doc.description = description;
			doc.updatedBy = req.user;

			doc.save();
			return res.json(doc);
		})
		.catch((error) =>
			next({ status: 400, message: { message: ' Ocorreu um erro ao tentar atualizar o procedimento' }, error })
		);
};

const deletePhoto = async (req, res, next) => {
	const { id } = req.params;

	const { photo } = req.body;

	const procedure = await Procedure.findById({ _id: id });

	if (!procedure) {
		return next({ status: 404, message: { path: 'procedure', message: 'Procedimento não localizado' } });
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
		.catch((error) => next({ status: 400, message: { path: 'procedure', message: error } }));
};

const list = async (req, res) => {
	const list = await Procedure.find({}).sort({ createdAt: -1 }).limit(100);
	return res.json(list);
};

module.exports = { create, update, list, deletePhoto };
