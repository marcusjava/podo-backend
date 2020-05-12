const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const routes = Router();
const upload = multer(uploadConfig);
const passport = require('passport');

const PhotoController = require('../../controllers/PhotoController');

routes.post(
	'/:consult_id',
	upload.single('photo'),
	passport.authenticate('jwt', { session: false }),
	PhotoController.create
);

routes.get(
	'/:consult_id',
	upload.single('photo'),
	passport.authenticate('jwt', { session: false }),
	PhotoController.list
);

// @route PUT api/consults/:id
// @desc Update Consult
// @access Private
routes.delete('/:id', passport.authenticate('jwt', { session: false }), PhotoController.delete_photo);

module.exports = routes;
