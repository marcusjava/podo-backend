const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (Validator.isEmpty(data.email)) {
		errors = { path: 'email', message: 'Email obrigatorio' };
	}

	if (Validator.isEmpty(data.password)) {
		errors = { path: 'password', message: 'Senha obrigatoria' };
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
