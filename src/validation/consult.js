const Validator = require('validator');
const isEmpty = require('./is-empty');
const isArray = require('./is-array');

module.exports = (data) => {
	let errors = {};

	data.date = !isEmpty(data.date) ? data.date : '';
	data.client = !isEmpty(data.client) ? data.client : '';
	data.procedures = !isArray(data.procedures) ? data.procedures : [];
	data.type_consult = !isEmpty(data.type_consult) ? data.type_consult : {};
	data.status = !isEmpty(data.status) ? data.status : {};

	if (Validator.isEmpty(data.date)) {
		errors = { path: 'date', message: 'Informe a data da consulta' };
	}

	if (Validator.isEmpty(data.client)) {
		errors = { path: 'client', message: 'Informe o cliente' };
	}

	if (isArray(data.procedures)) {
		errors = { path: 'procedures', message: 'Informe ao menos um procedimento' };
	}

	if (isEmpty(data.type_consult)) {
		errors = { path: 'type_consult', message: 'Informe o tipo da consulta' };
	}

	if (isEmpty(data.status)) {
		errors = { path: 'status', message: 'Informe o status da consulta' };
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
