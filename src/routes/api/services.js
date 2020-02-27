const { Router } = require('express');

const routes = Router();
const passport = require('passport');

const ServiceController = require('../../controllers/ServiceController');

// @route POST api/services
// @desc Service create
// @access Private
routes.post('/', passport.authenticate('jwt', { session: false }), ServiceController.create);

// @route PUT api/services/:id
// @desc Update Service
// @access Private
routes.put('/:id', passport.authenticate('jwt', { session: false }), ServiceController.update);

// @route GET api/services
// @desc GET list Service
// @access Private
routes.get('/', passport.authenticate('jwt', { session: false }), ServiceController.list);

module.exports = routes;
