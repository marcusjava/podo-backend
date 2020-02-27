module.exports = string => {
	return string.split(',').map(t => t.trim());
};
