const Consult = require('../models/Consult');
const Photo = require('../models/Photo');

const create = async (req, res, next) => {
	//const url = process.env.URL || 'http://localhost:3001';

	const { consult_id } = req.params;
	const consult = await Consult.find({ _id: consult_id });

	const { originalname, size, key, location: url = '' } = req.file;
	if (!consult) {
		return next({ status: 404, message: { path: 'general', message: 'Consulta não localizada!' } });
	}

	try {
		const photo = await Photo.create({
			consult: consult_id,
			name: originalname,
			size: size,
			key: key,
			//url: `${url}/files/${key}`,
			//: process.env.STORAGE_TYPE === 'local' ? `http://localhost:3001/files/${key}` : url
			url,
			createdBy: req.user,
		});
		return res.status(201).json(photo);
	} catch (error) {
		return next({ status: 400, message: { path: 'general', message: 'Erro ao salvar a imagem!', error } });
	}
};

const delete_photo = async (req, res, next) => {
	const { id } = req.params;

	try {
		const photo = await Photo.findById(id);
		photo.updatedBy = req.user;
		await photo.remove();
		return res.json({ path: 'general', message: 'Foto excluida com sucesso' });
	} catch (error) {
		return next({ status: 400, message: { path: 'general', message: 'Erro ao tentar excluir a imagem!', error } });
	}
};

const list = async (req, res, next) => {
	const { consult_id } = req.params;
	try {
		const photos = await Photo.find({ consult: consult_id });
		return res.json(photos);
	} catch (error) {
		return next({ status: 400, message: { path: 'general', message: 'Erro ao obter as imagens!', error } });
	}
};

module.exports = { create, delete_photo, list };
