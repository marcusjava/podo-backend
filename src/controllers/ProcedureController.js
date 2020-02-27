const Procedure = require('../models/Procedure');

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

	let updated;

	try {
		await procedure.update(
			{ photos: req.files.map(thumbnail => thumbnail.filename), service, name, description, updatedBy: req.user },
			{ new: true }
		);
	} catch (error) {
		return res.status(400).json({ error });
	}

	return res.json(procedure);
};

const list = async (req, res) => {
	const list = await Procedure.find();
	return res.json(list);
};

module.exports = { create, update, list };
