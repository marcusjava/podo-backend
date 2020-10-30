const Client = require('../models/Client');
const ValidateClient = require('../validation/client');
const ValidateCPF = require('../utils/ValidateCPF');

const create = async (req, res, next) => {
	const { errors, isValid } = ValidateClient(req.body);

	if (!isValid) {
		return next({ status: 400, message: errors });
	}
	const { name, instagram, cpf, rg, email, address, occupation, contact, nasc, sex, etnia } = req.body;

	const cpfExists = await Client.findOne({ cpf });

	if (cpfExists != null) {
		return next({ status: 500, message: { path: 'cpf', message: 'CPF já cadastrado' } });
	}

	//Validando o cpf somente em producao

	if (process.env.NODE_ENV === 'production') {
		const validCPF = ValidateCPF(cpf);
		if (!validCPF) {
			return next({ status: 500, message: { path: 'cpf', message: 'CPF invalido' } });
		}
	}

	const newClient = new Client({
		avatar: typeof req.file === 'undefined' ? 'no-img.png' : req.file.key,
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
		.then((response) => res.status(201).json(response))
		.catch((error) => {
			console.error(error);
			return next({
				status: 400,
				message: { path: 'general', message: 'Ocorreu um error ao salvar o usuario' },
				error,
			});
		});
};

//TODO
// Update image client - OK
// Pagination

const update = async (req, res, next) => {
	const { errors, isValid } = ValidateClient(req.body);

	if (!isValid) {
		return next({ status: 400, message: errors });
	}

	const { id } = req.params;
	const { name, instagram, cpf, rg, email, address, occupation, contact, nasc, sex, etnia } = req.body;

	let oldAvatar;

	Client.findById(id)
		.then((doc) => {
			if (!doc) {
				return res.status(404).json({ message: 'Cliente não localizado' });
			}

			oldAvatar = doc.avatar;

			doc.avatar = typeof req.file === 'undefined' ? doc.avatar : req.file.key;
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
			// if(oldAvatar !== 'no-img.png' && doc.avatar !== 'no-img.png' && oldAvatar !== doc.avatar){
			// }
			return res.json(doc);
		})
		.catch((error) => {
			return next({
				status: 400,
				message: { path: 'general', message: 'Ocorreu um erro ao atualizar o cliente' },
				error,
			});
		});
};

const retrieve = async (req, res, next) => {
	const { id } = req.params;

	const client = await Client.findById(id);

	if (!client) {
		return next({ status: 404, message: { path: 'general', message: 'Cliente não localizado' } });
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

	list = await Client.find(condition).sort({ createdAt: -1 }).limit(200);

	return res.json(list);
};

module.exports = { create, update, list, retrieve };
