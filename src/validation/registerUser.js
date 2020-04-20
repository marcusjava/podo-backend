const Validator = require('validator');
const isEmpty = require('./is-empty');
const isArray = require('./is-array');

module.exports = data => {
	let errors = {};

	const address = JSON.parse(data.address);

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.role = !isEmpty(data.role) ? data.role : '';
	data.cpf = !isEmpty(data.cpf) ? data.cpf : '';
	address.street = !isEmpty(address.street) ? address.street : '';
	address.neighborhood = !isEmpty(address.neighborhood) ? address.neighborhood : '';
	address.city = !isEmpty(address.city) ? address.city : '';
	address.state = !isEmpty(address.state) ? address.state : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Nome do usuario precisa ser entre 2 e 30 caracteres';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Informe o nome';
	}

	if (Validator.isEmpty(data.cpf)) {
		errors.cpf = 'Informe o cpf do usuario';
	}

	if (Validator.isEmpty(data.role)) {
		errors.cpf = 'Informe o nivel de acesso do usuario';
	}

	if (Validator.isEmpty(address.street)) {
		errors.address.street = 'Informe a rua';
	}
	if (Validator.isEmpty(address.neighborhood)) {
		errors.address.street = 'Informe o Bairro';
	}

	if (Validator.isEmpty(address.city)) {
		errors.address.street = 'Informe a cidade';
	}

	if (Validator.isEmpty(address.state)) {
		errors.address.street = 'Informe o Estado';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Informe a senha';
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Informe a confirmação de senha';
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
