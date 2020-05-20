const Validator = require('validator');
const isEmpty = require('./is-empty');
const isArray = require('./is-array');

module.exports = (data) => {
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
		errors = { path: 'name', message: 'Nome do usuario precisa ser entre 2 e 30 caracteres' };
	}

	if (Validator.isEmpty(data.name)) {
		errors = { path: 'name', message: 'Informe o nome' };
	}

	if (Validator.isEmpty(data.cpf)) {
		errors = { path: 'cpf', message: 'Informe o cpf do usuario' };
	}

	if (Validator.isEmpty(data.role)) {
		errors = { path: 'role', message: 'Informe o nivel de acesso do usuario' };
	}

	if (Validator.isEmpty(address.street)) {
		errors = { path: 'address.street', message: 'Informe a Rua' };
	}
	if (Validator.isEmpty(address.neighborhood)) {
		errors = { path: 'address.neighborhood', message: 'Informe o Bairro' };
	}

	if (Validator.isEmpty(address.city)) {
		errors = { path: 'address.city', message: 'Informe a Cidade' };
	}

	if (Validator.isEmpty(address.state)) {
		errors = { path: 'address.state', message: 'Informe o Estado' };
	}

	if (Validator.isEmpty(data.password)) {
		errors = { path: 'password', message: 'Informe a senha' };
	}

	if (Validator.isEmpty(data.password2)) {
		errors = { path: 'password2', message: 'Informe a confirmação de senha' };
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors = { path: 'password', message: 'Senha e confirmação de senha não estão iguais' };
		errors = { path: 'password2', message: 'Senha e confirmação de senha não estão iguais' };
	}

	if (!Validator.isEmail(data.email)) {
		errors = { path: 'email', message: 'Email com formato incorreto' };
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
