const Consult = require('../models/Consult');
const Photo = require('../models/Photo');

const create = async (req, res) => {
	const url = process.env.URL || 'http://localhost:3001';
	const { consult_id } = req.params;
	const consult = await Consult.find({ _id: consult_id });
	if (!consult) {
		return res.status(404).json({ message: 'Consulta não localizada!' });
	}

	try {
		const photo = await Photo.create({
			consult: consult_id,
			name: req.file.originalname,
			size: req.file.size,
			key: req.file.key,
			url: `${url}/files/${req.file.filename}`,
			createdBy: req.user,
		});
		return res.status(201).json(photo);
	} catch (error) {
		return res.status(400).json({ message: 'Erro ao salvar a imagem' });
	}
};

const delete_photo = async (req, res) => {
	const { id } = req.params;

	try {
		const photo = await Photo.findById(id);
		photo.updatedBy = req.user;
		await photo.remove();
		return res.json({ message: 'Foto excluida com sucesso' });
	} catch (error) {
		return res.json({ message: 'Falha ao excluir a foto' });
	}
};

const list = async (req, res) => {
	const { consult_id } = req.params;
	try {
		const photos = await Photo.find({ consult: consult_id });
		return res.json(photos);
	} catch (error) {
		return res.status(400).json({ message: 'Erro ao obter as fotos da consulta' });
	}
};

module.exports = { create, delete_photo, list };
