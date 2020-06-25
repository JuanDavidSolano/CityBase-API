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
	type: {
		type: String,
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
	state: {
		type: String,
		default: 'Activa',
	},
};

const complaint = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('complaint', complaint),
	fields,
};
