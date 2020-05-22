const Loggly = require('winston-loggly-bulk').Loggly;
const winston = require('winston');
const config = require('../../config');
const fs = require('fs');
const path = require('path');
const SentryTransport = require('@synapsestudios/winston-sentry');
const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://010566d2463045d8a47b28226d8f8a5f@o396405.ingest.sentry.io/5249707' });

const logger = winston.createLogger({
	transports: [
		new Loggly(config.loggly),
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
	],
	exitOnError: false,
});

logger.stream = {
	write: (info) => {
		logger.info(info);
	},
};

module.exports = logger;
