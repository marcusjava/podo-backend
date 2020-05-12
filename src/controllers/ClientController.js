const Client = require('../models/Client');
const ValidateClient = require('../validation/client');

const create = async (req, res) => {
	const { errors, isValid } = ValidateClient(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const { name, instagram, cpf, rg, email, address, occupation, contact, nasc, sex, etnia } = req.body;

	const newClient = new Client({
		avatar: typeof req.file === 'undefined' ? 'no-img.png' : req.file.filename,
		name,
		instagram,
		cpf,
		rg,
		email,
		address: JSON.parse(address),
		occupation,
		contact,
		nasc,
		sex: JSON.parse(sex),
		etnia: JSON.parse(etnia),
		createdBy: req.user,
	});

	newClient
		.save()
		.then((response) => res.status(201).send('Cliente salvo com sucesso'))
		.catch((error) => {
			if (error.errors.cpf) {
				res.status(400).json({ path: 'cpf', message: 'CPF já cadastrado' });
			}
			if (error.errors.email) {
				res.status(400).json({ path: 'email', message: 'Email já cadastrado' });
			}
			res.status(400).json({ message: 'Ocorreu um error ao salvar o usuario' });
		});
};

//TODO
// Update image client - OK
// Pagination

const update = async (req, res) => {
	const { errors, isValid } = ValidateClient(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { id } = req.params;
	const { name, instagram, cpf, rg, email, address, occupation, contact, nasc, sex, etnia } = req.body;

	Client.findById(id)
		.then((doc) => {
			if (!doc) {
				return res.status(404).json({ message: 'Cliente não localizado' });
			}
			doc.avatar = typeof req.file === 'undefined' ? doc.avatar : req.file.filename;
			doc.name = name;
			doc.instagram = instagram;
			doc.cpf = cpf;
			doc.rg = rg;
			doc.email = email;
			doc.address = JSON.parse(address);
			doc.occupation = occupation;
			doc.contact = contact;
			doc.nasc = nasc;
			doc.sex = JSON.parse(sex);
			doc.etnia = JSON.parse(etnia);
			doc.updatedBy = req.user;
			return doc.save();
		})
		.then((doc) => {
			return res.json(doc);
		})
		.catch((error) => {
			console.log(error);
			return res.status(400).json(error);
		});
};

const retrieve = async (req, res) => {
	const { id } = req.params;

	const client = await Client.findById(id);

	if (!client) {
		return res.status(404).json({ path: 'client', message: 'Cliente não localizado' });
	}

	return res.json(client);
};

const list = async (req, res) => {
	const { name, email, cpf, contact, id } = req.query;

	const condition = {};
	let list = [];

	if (name != undefined) {
		condition.name = { $regex: name, $options: 'i' };
	}

	if (email != undefined) {
		condition.email = { $regex: email, $options: 'i' };
	}

	if (cpf != undefined) {
		condition.cpf = { $regex: cpf, $options: 'i' };
	}
	if (contact != undefined) {
		condition.contact = { $regex: contact, $options: 'i' };
	}

	list = await Client.find(condition).sort({ createdAt: -1 }).limit(500);

	return res.json(list);
};

module.exports = { create, update, list, retrieve };
