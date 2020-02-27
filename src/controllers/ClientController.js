const Client = require('../models/Client');
const ValidateClient = require('../validation/client');

//TODO
// Validate client OK

const create = async (req, res) => {
	const { errors, isValid } = ValidateClient(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const { filename } = req.file;
	const { name, cpf, rg, email, address, district, state, cep, occupation, contact, nasc, sex, etnia } = req.body;

	const client = await Client.findOne({ cpf, email });

	if (client) {
		return res.status(400).json({ error: 'Cliente já cadastrado no sistema' });
	}

	let newClient;
	try {
		newClient = await Client.create({
			avatar: filename,
			name,
			cpf,
			rg,
			email,
			address,
			district,
			state,
			cep,
			occupation,
			contact,
			nasc,
			sex,
			etnia,
			createdBy: req.user,
		});
	} catch (error) {
		return res.json(error);
	}

	await newClient.populate('createdBy', '-password').execPopulate();

	return res.status(201).json(newClient);
};

//TODO
// Update image client - OK
// Pagination

const update = async (req, res) => {
	const { errors, isValid } = ValidateClient(req.body);

	console.log(req.user._id);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { filename } = req.file;
	const { id } = req.params;
	const { name, cpf, rg, email, address, district, state, cep, occupation, contact, nasc, sex, etnia } = req.body;

	const client = await Client.findById({ _id: id });
	if (!client) {
		return res.status(404).json({ errors: 'Cliente não localizado' });
	}

	let updated;

	try {
		updated = await Client.findByIdAndUpdate(
			{ _id: id },
			{
				avatar: filename,
				name,
				cpf,
				rg,
				email,
				address,
				district,
				state,
				cep,
				occupation,
				contact,
				nasc,
				sex,
				etnia,
				updatedBy: req.user,
			},
			{ new: true }
		);
	} catch (error) {
		res.json(error);
	}

	await updated.populate('createdBy updatedBy').execPopulate();

	return res.json(updated);
};

const list = async (req, res) => {
	let list;

	try {
		list = await Client.find().populate('createdBy updatedBy');
	} catch (error) {
		return res.json(error);
	}

	return res.json(list);
};

module.exports = { create, update, list };
