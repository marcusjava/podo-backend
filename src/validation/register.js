const Validator = require('validator');
const isEmpty = require('./is-empty');
const isArray = require('./is-array');

module.exports = data => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.role = !isEmpty(data.role) ? data.role : [];
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Nome do usuario precisa ser entre 2 e 30 caracteres';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Informe o nome';
	}

	if (isArray(data.role)) {
		errors.role = 'Informe ao menos uma regra para este usuario';
	}

	if (Validator.isEmpty(data.password)) {
		errors.name = 'Informe a senha';
	}

	if (Validator.isEmpty(data.password2)) {
		errors.name = 'Informe a confirmação de senha';
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password = 'Senha e confirmação de senha não estão iguais';
		errors.password2 = 'Senha e confirmação de senha não estão iguais';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email incorreto';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
