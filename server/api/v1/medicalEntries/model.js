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
	doctor: {
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
	hospitalizedTime: {
		type: Number,
		default: 0,
	},
	insurance: {
		type: Boolean,
		default: false,
	},
	medicines: [
		{
			type: String,
		},
	],
	price: {
		type: Number,
		required: true,
	},
};

const medicalEntry = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('medicalEntry', medicalEntry),
	fields,
};
