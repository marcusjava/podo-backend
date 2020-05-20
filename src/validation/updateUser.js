const Validator = require('validator');
const isEmpty = require('./is-empty');
const isArray = require('./is-array');

module.exports = (data) => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.cpf = !isEmpty(data.cpf) ? data.cpf : '';
	data.role = !isEmpty(data.role) ? data.role : [];

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors = { path: 'name', message: 'Nome do usuario precisa ser entre 2 e 30 caracteres' };
	}

	if (Validator.isEmpty(data.name)) {
		errors = { path: 'name', message: 'Informe o nome' };
	}

	if (Validator.isEmpty(data.cpf)) {
		errors = { path: 'cpf', message: 'Informe o cpf' };
	}

	if (isArray(data.role)) {
		errors = { path: 'role', message: 'Informe ao menos uma regra para este usuario' };
	}

	if (!Validator.isEmail(data.email)) {
		errors = { path: 'email', message: 'Email incorreto' };
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
