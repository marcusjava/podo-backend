const Loggly = require('winston-loggly-bulk').Loggly;
const winston = require('winston');
const config = require('../../config');
const fs = require('fs');
const path = require('path');
require('winston-mail');

//console, file, and HTTP

const options = {
	to: 'marcusdevmail@gmail.com',
	from: 'marcusdevmail@gmail.com',
	host: 'in-v3.mailjet.com',
	port: 587,
	username: 'f677a294738f7e3be7c4a757e6aa1398',
	password: '917cdb0b9d5a882d2b1089cf28a8d17d',
	leval: 'error',
	html: true,
};

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
		// log to email
		new winston.transports.Mail(options),
	],
	exitOnError: false,
});

logger.stream = {
	write: (info) => {
		logger.info(info);
	},
};

module.exports = logger;
