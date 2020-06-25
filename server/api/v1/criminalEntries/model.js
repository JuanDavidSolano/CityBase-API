const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Schema } = mongoose;

const fields = {
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	officer: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	details: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	prisonTime: {
		type: Number,
		default: 0,
	},
	// TOTAL TICKET SUM
	ticket: {
		type: Number,
		default: 0,
	},
};

const criminalEntry = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('criminalEntry', criminalEntry),
	fields,
};
