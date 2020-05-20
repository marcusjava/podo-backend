const Service = require('../models/Service');
const ValidateService = require('../validation/service');

const create = async (req, res, next) => {
	const { errors, isValid } = ValidateService(req.body);

	if (!isValid) {
		return next({ status: 400, message: errors });
	}

	const { description, observations } = req.body;

	const service = await Service.findOne({ description });

	if (service) {
		return next({ status: 404, message: { path: 'description', message: 'Serviço já cadastrado' } });
	}

	const newService = new Service({
		description,
		observations,
		createdBy: req.user,
	});

	newService
		.save()
		.then((service) => {
			return res.status(201).json(service);
		})
		.catch((error) => {
			return next({ status: 400, message: error });
		});
};

const update = async (req, res, next) => {
	//const { errors, isValid} = ValidateService(req.body)

	const { description, observations } = req.body;

	const { id } = req.params;

	const service = await Service.findById({ _id: id });

	if (!service) {
		return next({ status: 404, message: { path: 'description', message: 'Serviço não localizado' } });
	}

	Service.findByIdAndUpdate(
		{ _id: id },
		{
			description,
			observations,
			updatedBy: req.user,
		},
		{ new: true }
	)
		.then((service) => res.json(service))
		.catch((error) => next({ status: 400, message: { path: 'general', message: error } }));
};

const list = async (req, res) => {
	const list = await Service.find({}).sort({ createdAt: -1 });

	return res.json(list);
};

module.exports = { create, update, list };
