require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./config/logger');
const passport = require('passport');
var fs = require('fs');
const dayjs = require('dayjs');
const serveIndex = require('serve-index');

const users = require('./routes/api/users');
const clients = require('./routes/api/clients');
const procedures = require('./routes/api/procedures');
const services = require('./routes/api/services');
const consults = require('./routes/api/consults');

// URI mongodb atlas mongodb+srv://omnistack:omnistack@cluster0-kjbyd.mongodb.net/semana09?retryWrites=true&w=majority
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
//mongoose.set('debug', true);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

//Handle errors to log
app.use(
	morgan('combined', {
		skip: (req, res) => res.statusCode < 400,
		interval: '7d',
		stream: logger.stream,
	})
);

// Routes

app.use('/api/users', users);
app.use('/api/clients', clients);
app.use('/api/procedures', procedures);
app.use('/api/services', services);
app.use('/api/consults', consults);

//Handle errors to log
app.use(function (err, req, res, next) {
	// set locals, only providing error in development

	logger.error(
		`${dayjs(Date.now()).format('DD-MM-YYYYTHH:mm:ssZ')} - ${err.status || 500} - ${
			err.error || 'Internal Error'
		} - ${err.message.message}  - ${req.originalUrl} - ${req.method} - ${req.ip}`
	);
	return res.status(err.status || 500).json(
		err.message || {
			path: 'general',
			message: 'Desculpe mas algo errado aconteceu, entre em contato com o administrador',
		}
	);
});

//fazendo com que as imagens fiquem acessiveis
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

//fazendo com que as imagens fiquem acessiveis
app.use(
	'/logs',
	express.static(path.resolve(__dirname, '..', 'logs')),
	serveIndex(path.resolve(__dirname, '..', 'logs'), { icons: true })
);

//if (process.env.NODE_ENV === 'production') {
//	app.use(express.static(path.resolve(__dirname, '..', 'build')));
//	app.get('/app', (req, res) => {
//		res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
//	});
//}

app.listen(process.env.PORT || 3001, () => {
	console.log(`Server started at port 3001`);
});
