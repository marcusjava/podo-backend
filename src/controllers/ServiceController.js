const Service = require('../models/Service');
const ValidateService = require('../validation/service');

const create = async (req, res) => {
	const { errors, isValid } = ValidateService(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { description, observations } = req.body;

	const service = await Service.findOne({ description });

	if (service) {
		errors.service = 'Serviço já cadastrado';
		return res.status(400).json(errors);
	}

	let newService;

	try {
		newService = await Service.create({
			description,
			observations,
			createdBy: req.user,
		});
	} catch (error) {
		return res.status(400).json(error);
	}

	return res.status(201).json(newService);
};

const update = async (req, res) => {
	//const { errors, isValid} = ValidateService(req.body)

	const { description, observations } = req.body;

	const { id } = req.params;

	const service = await Service.findById({ _id: id });

	if (!service) {
		return res.status(400).json({ error: 'Serviço não localizado' });
	}

	let updated;

	try {
		await service.updateOne(
			{
				description,
				observations,
				updatedBy: req.user,
			},
			{ new: true }
		);
	} catch (error) {
		console.log(error);
	}

	return res.json(service);
};

const list = async (req, res) => {
	const list = await Service.find();

	return res.json(list);
};

module.exports = { create, update, list };
