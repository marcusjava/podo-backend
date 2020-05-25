const winston = require('winston');
const config = require('../../config');
const fs = require('fs');
const path = require('path');
const SentryTransport = require('@synapsestudios/winston-sentry');
const Sentry = require('@sentry/node');
require('winston-mongodb');

Sentry.init({ dsn: process.env.SENTRY_DSN });

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({ level: 'info', handleExceptions: true, json: false, colorize: true }),
		new winston.transports.File({
			level: 'info',
			filename: path.join(__dirname, '..', '..', 'access.log'),
			handleExceptions: true,
			json: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			colorize: false,
		}),
		new SentryTransport({ Sentry }),
		new winston.transports.MongoDB({
			db: process.env.MONGO_URI,
			username: 'admin',
			password: 'paletizado19',
			tryReconnect: true,
		}),
	],
	exitOnError: false,
});

logger.stream = {
	write: (info) => {
		logger.info(info);
	},
};

module.exports = logger;
