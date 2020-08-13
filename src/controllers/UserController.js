const User = require('../models/User');
const ValidateLogin = require('../validation/login');
const ValidateRegister = require('../validation/registerUser');
const UpdateRegister = require('../validation/updateUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 *
 * Não permitir login para usuario inativo
 *
 *
 */

const login = async (req, res, next) => {
	const { errors, isValid } = ValidateLogin(req.body);
	if (!isValid) {
		return next({ status: 400, message: errors });
	}
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next({ status: 404, message: { path: 'email', message: 'Usuario não encontrado' } });
	}

	//user inativo
	if (user.status.value == 1) {
		return next({ status: 400, message: { path: 'email', message: 'Usuario inativo' } });
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
					avatar_url:
						process.env.STORAGE_TYPE == 'local'
							? `http://localhost:3001/files/${user.thumbnail}`
							: `https://podobucket.s3.us-east-2.amazonaws.com/${user.thumbnail}`,
				};

				jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' }, (error, token) => {
					res.json({ success: true, token: `Bearer ${token}` });
				});
			} else {
				return next({ status: 400, message: { path: 'password', message: 'Senha não confere' } });
			}
		})
		.catch((error) => next({ status: 400, message: { path: 'general', message: error } }));
};

const register = async (req, res, next) => {
	const { errors, isValid } = ValidateRegister(req.body);

	if (!isValid) {
		return next({ status: 400, message: { message: errors } });
	}

	const { name, phone, nasc, cpf, rg, email, address, password, status, role } = req.body;

	const user = await User.findOne({ $or: [{ email }, { cpf }, { rg }] });

	if (user && user.email == email) {
		return next({ status: 400, message: { path: 'email', message: 'Já existe um usuario com esse email' } });
	}

	if (user && user.cpf == cpf) {
		return next({ status: 400, message: { path: 'cpf', message: 'Já existe um usuario com esse CPF' } });
	}

	if (user && user.rg == rg) {
		return next({ status: 400, message: { path: 'rg', message: 'Já existe um usuario com esse RG' } });
	}

	const newUser = new User({
		thumbnail: typeof req.file === 'undefined' ? 'no-img.png' : req.file.key,
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
	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(newUser.password, salt, (error, hash) => {
			if (error)
				next({
					status: 500,
					message: {
						path: 'password',
						message: 'Ocorreu um erro ao tentar criar o hash da senha do usuario',
					},
					error,
				});

			newUser.password = hash;
			newUser
				.save()
				.then((user) => res.status(201).send({ msg: 'Usuario salvo com sucesso' }))
				.catch((error) => {
					if (error.errors.cpf) {
						return next({ status: 400, message: { path: 'cpf', message: 'CPF já cadastrado' } });
					}
					if (error.errors.email) {
						return next({ status: 400, message: { path: 'email', message: 'Email já cadastrado' } });
					}
					return next({
						status: 400,
						message: { path: 'general', message: 'Ocorreu um erro ao salvar o usuario' + error },
					});
				});
		});
	});
};

//TODO - Change password
const update = async (req, res, next) => {
	const { errors, isValid } = UpdateRegister(req.body);

	if (!isValid) {
		return next({ status: 400, message: errors });
	}
	const { id } = req.params;

	const { name, phone, nasc, cpf, rg, email, address, role, status } = req.body;

	const user = await User.findById({ _id: id });

	if (!user) {
		return next({ status: 404, message: { path: 'user', message: 'Usuario não encontrado' } });
	}

	User.findByIdAndUpdate(
		{ _id: id },
		{
			thumbnail: typeof req.file === 'undefined' ? user.thumbnail : req.file.key,
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
		.catch((error) => next({ status: 400, message: error }));
};

const changePwd = async (req, res, next) => {
	const { password, password2 } = req.body;
	const { id } = req.params;

	if (password != password2) {
		return next({ status: 400, message: { path: 'password', message: 'Senhas não conferem' } });
	}

	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(password, salt, (error, hash) => {
			if (error) throw error;
			User.findByIdAndUpdate({ _id: id }, { password: hash }, { new: true })
				.then((user) =>
					res.json({ status: 200, msg: { path: 'general', message: 'Senha atualizada com sucesso' } })
				)
				.catch((error) =>
					next({
						status: 400,
						message: { path: 'password', message: 'Erro ao tentar alterar a senha' },
						error,
					})
				);
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
