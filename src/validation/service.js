const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
	let errors = {};

	data.description = !isEmpty(data.description) ? data.description : '';

	if (!Validator.isLength(data.description, { min: 2, max: 30 })) {
		errors.name = 'Nome do serviço precisa ser entre 2 e 30 caracteres';
	}

	if (Validator.isEmpty(data.description)) {
		errors.name = 'Informe a descrição do serviço';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
