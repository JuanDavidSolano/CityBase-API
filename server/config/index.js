require('dotenv').config('');

const config = {
	db: {
		uri: process.env.DB_URI,
	},
	key: {
		key: process.env.KEY,
	},
};

module.exports = config;
