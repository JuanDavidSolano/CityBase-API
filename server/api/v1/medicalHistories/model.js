const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Schema } = mongoose;

const fields = {
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	entries: [
		{
			type: Schema.Types.ObjectId,
			ref: 'medicalEntry',
		},
	],
};

const medicalHistory = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('medicalHistory', medicalHistory),
	fields,
};
