const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Schema } = mongoose;

const fields = {
	title: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	details: {
		type: String,
		required: true,
	},
	expirationDate: {
		type: String,
		required: true,
	},
	expeditionDate: {
		type: String,
		required: true,
	},
	expired: {
		type: Boolean,
		default: false,
	},
};

const license = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('license', license),
	fields,
};
