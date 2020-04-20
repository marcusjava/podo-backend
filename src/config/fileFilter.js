module.exports = (req, file, cb) => {
	if (
		!file.mimetype.includes('jpeg') &&
		!file.mimetype.includes('jpg') &&
		!file.mimetype.includes('png') &&
		!file.mimetype.includes('gif')
	) {
		return cb(null, false, new Error('Somente imagens são permitidas'));
	}
	cb(null, true);
};
