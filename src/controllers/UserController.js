const User = require('../models/User');
const ValidateLogin = require('../validation/login');
const ValidateRegister = require('../validation/register');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys_dev').secret;
const StringToArray = require('../utils/StringToArray');

const login = async (req, res) => {
	const { errors, isValid } = ValidateLogin(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const { name, password } = req.body;
	const user = await User.findOne({ name }).select('+password');

	if (!user) {
		errors.name = 'Usuario não encontrado';
		return res.status(404).json(errors);
	}
	bcrypt
		.compare(password, user.password)
		.then(isMatch => {
			if (isMatch) {
				const payload = { id: user.id, name: user.name, email: user.email, role: user.role };

				jwt.sign(payload, secret, { expiresIn: 3600 }, (error, token) => {
					res.json({ success: true, token: `Bearer ${token}` });
				});
			} else {
				errors.password = 'Senha não confere';
				return res.json(400).json(errors);
			}
		})
		.catch(error => {});
};

const register = async (req, res) => {
	const { errors, isValid } = ValidateRegister(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { filename } = req.file;

	const { name, email, password, role } = req.body;

	const user = await User.findOne({ name, email });

	if (user) {
		errors.name = 'Já existe um usuario com esse nome';
		return res.status(400).json(errors);
	}

	const newUser = new User({
		avatar: filename,
		name,
		email,
		password,
		role: StringToArray(role),
	});
	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newUser.password, salt, (error, hash) => {
			if (error) throw error;

			newUser.password = hash;
			newUser
				.save()
				.then(user => res.json(user))
				.catch(error => console.log(error));
		});
	});
};

const update = async (req, res) => {
	const { id } = req.params;
	const { name, email, role, avatar_url, status } = req.body;

	const user = await User.findById({ _id: id });

	if (!user) {
		return res.status(400).json({ errors: 'Usuario não encontrado' });
	}

	const updateUser = await User.findByIdAndUpdate(
		{ _id: id },
		{ name, email, role, avatar_url, status },
		{ new: true }
	);

	return res.json(updateUser);
};

const listUsers = async (req, res) => {
	const users = await User.find();
	return res.json(users);
};

module.exports = { login, register, update, listUsers };
