const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const routes = Router();
const upload = multer(uploadConfig);
const passport = require('passport');

const ProcedureController = require('../../controllers/ProcedureController');

// @route POST api/procedures
// @desc Procedure create
// @access Private
routes.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	upload.array('thumbnails', 5),
	ProcedureController.create
);

// @route PUT api/procedures/:id
// @desc Update Procedure
// @access Private
routes.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	upload.array('thumbnails', 5),
	ProcedureController.update
);

// @route PUT api/procedures/:id
// @desc Update Procedure
// @access Private
routes.put('/:id/photos', passport.authenticate('jwt', { session: false }), ProcedureController.deletePhoto);

// @route GET api/procedures
// @desc List Procedure
// @access Private
routes.get('/', passport.authenticate('jwt', { session: false }), ProcedureController.list);

// @route GET api/procedures
// @desc List Procedure by filter
// @access Private
routes.get('/search', passport.authenticate('jwt', { session: false }), ProcedureController.filter);

module.exports = routes;
