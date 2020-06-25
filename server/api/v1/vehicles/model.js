const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Schema } = mongoose;

const fields = {
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	plate: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	insurance: {
		type: Schema.Types.ObjectId,
		res: 'insurance',
	},
};

const complaint = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('complaint', complaint),
	fields,
};
