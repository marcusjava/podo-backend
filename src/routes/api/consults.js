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
// @desc GET Consult
// @access Private
routes.get('/:id', passport.authenticate('jwt', { session: false }), ConsultController.retrieve);

// @route GET api/consults
// @desc List Consult
// @access Private
routes.get('/', passport.authenticate('jwt', { session: false }), ConsultController.list);

// @route GET api/consults
// @desc List Consult
// @access Private
routes.get('/:id/logs', passport.authenticate('jwt', { session: false }), ConsultController.log);

module.exports = routes;
