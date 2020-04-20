const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (Validator.isEmpty(data.email)) {
		errors.username = 'Email requerido';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Senha requerida';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
