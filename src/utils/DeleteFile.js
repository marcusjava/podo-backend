const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const aws = require('aws-sdk');

const s3 = new aws.S3();

module.exports = (key) => {
	if (process.env.STORAGE_TYPE === 's3') {
		s3.deleteObject({
			Bucket: 'podobucket',
			Key: key,
		}).promise();
	} else {
		promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', key));
	}
};
