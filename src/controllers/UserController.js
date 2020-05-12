const User = require('../models/User');
const ValidateLogin = require('../validation/login');
const ValidateRegister = require('../validation/registerUser');
const UpdateRegister = require('../validation/updateUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys_dev').secret;

const login = async (req, res) => {
	const { errors, isValid } = ValidateLogin(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		errors.notfound = 'Usuario não encontrado';
		return res.status(404).json(errors);
	}
	bcrypt
		.compare(password, user.password)
		.then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					avatar_url: `http://localhost:3001/files/${user.thumbnail}`,
				};

				jwt.sign(payload, secret, { expiresIn: '24h' }, (error, token) => {
					res.json({ success: true, token: `Bearer ${token}` });
				});
			} else {
				errors.password = 'Senha não confere';
				return res.json(400).json(errors);
			}
		})
		.catch((error) => console.log(error));
};

const register = async (req, res) => {
	const { errors, isValid } = ValidateRegister(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { name, phone, nasc, cpf, rg, email, address, password, status, role } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		errors.email = 'Já existe um usuario com esse email';
		return res.status(400).json(errors);
	}

	const newUser = new User({
		thumbnail: typeof req.file === 'undefined' ? 'no-img.png' : req.file.filename,
		name,
		phone,
		nasc,
		cpf,
		rg,
		phone,
		email,
		address: JSON.parse(address),
		password,
		role: JSON.parse(role),
		status: JSON.parse(status),
	});

	console.log(newUser);
	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newUser.password, salt, (error, hash) => {
			if (error) throw error;

			newUser.password = hash;
			newUser
				.save()
				.then((user) => res.status(201).send({ msg: 'Usuario salvo com sucesso' }))
				.catch((error) => {
					if (error.errors.cpf) {
						res.status(400).json({ path: 'cpf', message: 'CPF já cadastrado' });
					}
					if (error.errors.email) {
						res.status(400).json({ path: 'email', message: 'Email já cadastrado' });
					}
					res.status(400).json({ message: 'Ocorreu um error ao salvar o usuario' });
				});
		});
	});
};

//TODO - Change password
const update = async (req, res) => {
	const { errors, isValid } = UpdateRegister(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const { id } = req.params;

	const { name, phone, nasc, cpf, rg, email, address, role, status } = req.body;

	const user = await User.findById({ _id: id });

	if (!user) {
		return res.status(400).json({ errors: 'Usuario não encontrado' });
	}

	User.findByIdAndUpdate(
		{ _id: id },
		{
			thumbnail: typeof req.file === 'undefined' ? user.thumbnail : req.file.filename,
			name,
			phone,
			nasc,
			cpf,
			rg,
			phone,
			email,
			address: JSON.parse(address),
			role: JSON.parse(role),
			status: JSON.parse(status),
		},
		{ new: true }
	)
		.then((user) => res.json(user))
		.catch((error) => res.json({ message: error }));
};

const changePwd = async (req, res) => {
	const errors = {};
	const { password, password2 } = req.body;
	const { id } = req.params;

	if (password != password2) {
		errors.password = 'Senhas não conferem';
		return res.status(400).json(errors);
	}

	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(password, salt, (error, hash) => {
			if (error) throw error;
			User.findByIdAndUpdate({ _id: id }, { password: hash }, { new: true })
				.then((user) => res.json({ msg: 'Senha atualizada com sucesso' }))
				.catch((error) => res.status(400).json({ message: 'Erro ao alterar a senha do usuario' }));
		});
	});
};

const listUsers = async (req, res) => {
	const { name, email, cpf, contact } = req.query;

	const condition = {};

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

	const users = await User.find(condition).sort({ createdAt: -1 });
	return res.json(users);
};

module.exports = { login, register, update, listUsers, changePwd };
