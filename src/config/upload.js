const multer = require('multer');
const path = require('path');

module.exports = {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		filename: (req, file, cb) => {
			console.log(file);
			const ext = path.extname(file.originalname);
			const name = path.basename(file.originalname, ext);
			cb(null, `${name}-${Date.now()}${ext}`);
		},
	}),
	fileFilter: (req, file, cb) => {
		const allowedMimeTypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'application/pdf'];

		//verificando o tipo do arquivo e em seguida chama o callback
		if (allowedMimeTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Tipo de arquivo invalido'));
		}
	},
};
