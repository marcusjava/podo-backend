const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3Storage = require('multer-sharp-s3');

const storageTypes = {
	local: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
		},
		filename: (req, file, cb) => {
			const ext = path.extname(file.fieldname);
			const name = path.basename(file.fieldname, ext);

			file.key = `${name}-${Date.now()}${ext}`;

			cb(null, file.key);
		},
	}),
	s3: s3Storage({
		s3: new aws.S3(),
		Bucket: 'podobucket',
		contentType: s3Storage.AUTO_CONTENT_TYPE,
		ACL: 'public-read',
		key: (req, file, cb) => {
			const ext = path.extname(file.fieldname);
			const name = path.basename(file.fieldname, ext);

			file.key = `${name}-${Date.now()}${ext}`;

			cb(null, file.key);
		},
	}),
};

////Definido em variavel de ambiente
//const storage = new aws.S3({
//	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//});

module.exports = {
	dest: path.resolve(__dirname, '..', '..', 'uploads'),
	storage: storageTypes[process.env.NODE_ENV === 'production' ? 's3' : 'local'],
	//limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const allowedMimeTypes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

		//verificando o tipo do arquivo e em seguida chama o callback
		if (allowedMimeTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Tipo de arquivo invalido'));
		}
	},
};
