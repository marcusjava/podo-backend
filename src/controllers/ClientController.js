const Client = require('../models/Client');
const ValidateClient = require('../validation/client');
const Consult = require('../models/Consult');
const axios = require('axios');

//TODO
// Validate client OK

const instagramPhoto = async () => {
	// It will contain our photos' links
	const res = [];

	try {
		const response = await axios.get(`https://www.instagram.com/marcussergipe/`);
		// userInfoSource.data contains the HTML from Axios
		const jsonObject = response.data
			.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
			.slice(0, -1);
		const userInfo = JSON.parse(jsonObject);
		// Retrieve only the first 10 results
		const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(
			0,
			10
		);
		for (let media of mediaArray) {
			const node = media.node;

			// Process only if is an image
			if (node.__typename && node.__typename !== 'GraphImage') {
				continue;
			}

			// Push the thumbnail src in the array
			res.push(node.thumbnail_src);
		}
	} catch (error) {
		console.error('Unable to retrieve photos. Reason: ' + e.toString());
	}

	return res;
};

const create = async (req, res) => {
	const { errors, isValid } = ValidateClient(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const { name, instagram, cpf, rg, email, address, occupation, contact, nasc, sex, etnia } = req.body;

	const client = await Client.findOne({ cpf, email });

	if (client) {
		return res.status(400).json({ error: 'Cliente já cadastrado no sistema' });
	}

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
			res.status(400).json({ path: 'general', message: 'Ocorreu um error ao salvar o usuario' });
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

	const client = await Client.findById({ _id: id });
	if (!client) {
		return res.status(404).json({ errors: 'Cliente não localizado' });
	}

	Client.findByIdAndUpdate(
		{ _id: id },
		{
			avatar: typeof req.file === 'undefined' ? client.avatar : req.file.filename,
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
			updateBy: req.user,
		},
		{ new: true }
	)
		.then((client) => res.json(client))
		.catch((error) => res.status(400).json(error));
};

const retrieve = async (req, res) => {
	const { id } = req.params;

	const client = await Client.findById(id).populate('consults');

	if (!client) {
		return res.status(404).json({ path: 'client', message: 'Cliente não localizado' });
	}

	return res.json(client);
};

const list = async (req, res) => {
	console.log('consult list');
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

	list = await Client.find(condition).populate('consults').sort({ createdAt: -1 }).limit(500);

	return res.json(list);
};

module.exports = { create, update, list, retrieve };
