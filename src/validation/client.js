const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.cpf = !isEmpty(data.cpf) ? data.cpf : '';
	data.rg = !isEmpty(data.rg) ? data.rg : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.address = !isEmpty(data.address) ? data.address : '';
	data.district = !isEmpty(data.district) ? data.district : '';
	data.state = !isEmpty(data.state) ? data.state : '';
	data.cep = !isEmpty(data.cep) ? data.cep : '';
	data.ocupation = !isEmpty(data.ocupation) ? data.ocupation : '';
	data.contact = !isEmpty(data.contact) ? data.contact : '';
	data.nasc = !isEmpty(data.nasc) ? data.nasc : '';
	data.sex = !isEmpty(data.sex) ? data.sex : '';
	data.etnia = !isEmpty(data.etnia) ? data.etnia : '';

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors = { path: 'name', message: 'Nome do cliente precisa ser entre 2 e 30 caracteres' };
	}

	if (Validator.isEmpty(data.name)) {
		errors = { path: 'name', message: 'Informe o nome' };
	}

	if (Validator.isEmpty(data.contact)) {
		errors = { path: 'contact', message: 'Informe ao menos um contato' };
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
