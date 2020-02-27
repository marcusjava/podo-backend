const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../../config/upload');

const routes = Router();
const upload = multer(uploadConfig);

const passport = require('passport');

const UserController = require('../../controllers/UserController');

// @route POST api/users/register
// @desc Register user
// @access Private
// TODO
// - passport security - OK
routes.post(
	'/register',
	passport.authenticate('jwt', { session: false }),
	upload.single('thumbnail'),
	UserController.register
);

// @route POST api/users/login
// @desc Login user
// @access Public
routes.post('/login', UserController.login);

// @route PUT api/users/:id
// @desc Update user
// @access Private
routes.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('thumbnail'), UserController.update);

// @route GET api/users
// @desc List user
// @access Private
routes.get('/', passport.authenticate('jwt', { session: false }), UserController.listUsers);

module.exports = routes;
