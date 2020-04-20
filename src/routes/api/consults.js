const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const routes = Router();
const upload = multer(uploadConfig);
const passport = require('passport');

const ConsultController = require('../../controllers/ConsultController');

// @route POST api/consults
// @desc Consult create
// @access Private
routes.post('/', passport.authenticate('jwt', { session: false }), ConsultController.create);

// @route PUT api/consults/:id
// @desc Update Consult
// @access Private
routes.put('/:id', passport.authenticate('jwt', { session: false }), ConsultController.update);

// @route GET api/consults/:id
// @desc Update Consult
// @access Private
routes.get('/:id', passport.authenticate('jwt', { session: false }), ConsultController.retrieve);

// @route PUT api/consults/:id
// @desc Update Consult
// @access Private
routes.post(
	'/:id/photos',
	upload.single('photos'),
	passport.authenticate('jwt', { session: false }),
	ConsultController.photos
);
// @route PUT api/consults/:id
// @desc Update Consult
// @access Private
routes.delete(
	'/:consult_id/photos/:photo_id',
	upload.array('photos', 10),
	passport.authenticate('jwt', { session: false }),
	ConsultController.photos
);

// @route GET api/procedures
// @desc List Procedure
// @access Private
routes.get('/', passport.authenticate('jwt', { session: false }), ConsultController.list);

// @route GET api/procedures/?search
// @desc List Procedure by filter
// @access Private
routes.get('/search', passport.authenticate('jwt', { session: false }), ConsultController.filter);

module.exports = routes;
