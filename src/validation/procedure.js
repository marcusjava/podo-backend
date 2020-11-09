const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
	let errors = {};

	data.service = !isEmpty(data.service) ? data.service : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (Validator.isEmpty(data.service)) {
		errors = { path: 'service', message: 'Informe o serviço' };
	}

	if (Validator.isEmpty(data.name)) {
		errors = { path: 'name', message: 'Informe o nome do procedimento' };
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
