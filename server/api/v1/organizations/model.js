const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Schema } = mongoose;

const fields = {
	name: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	roles: [
		{
			type: String,
		},
	],
	employees: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	],
};

const organization = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('organization', organization),
	fields,
};
