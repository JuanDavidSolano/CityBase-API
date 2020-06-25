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
	entries: [
		{
			type: Schema.Types.ObjectId,
			ref: 'criminalEntry',
		},
	],
};

const criminalHistory = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('criminalHistory', criminalHistory),
	fields,
};
