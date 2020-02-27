const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
	let errors = {};

	data.service = !isEmpty(data.service) ? data.service : '';
	data.name = !isEmpty(data.name) ? data.name : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (Validator.isEmpty(data.service)) {
		errors.service = 'Informe o serviço';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Informe o nome do procedimento';
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'Informe a descrição do procedimento';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
