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
	type: {
		type: String,
		required: true,
	},
	expeditionDate: {
		type: String,
		required: true,
	},
	expiredDate: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	expired: {
		type: Boolean,
		default: false,
	},
};

const insurance = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('insurance', insurance),
	fields,
};
