const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
	let errors = {};

	data.username = !isEmpty(data.name) ? data.name : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (Validator.isEmpty(data.name)) {
		errors.username = 'Usuario requerido';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Senha requerida';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
