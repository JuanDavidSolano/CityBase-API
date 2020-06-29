const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Schema } = mongoose;

const fields = {
	// RENT OR SALE
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	// TOTAL PRICE
	price: {
		type: Number,
		required: true,
	},
	// DATE OF THE LAST PAY
	lastPayDate: {
		type: String,
	},
	// AMOUNT OF THE LAST PAY
	lastPay: {
		type: Number,
	},
	// ACTUAL DEBT OF THE PROPERTY
	debt: {
		type: Number,
	},
	// TRUE IF TOTALLY PAYED
	payed: {
		type: Boolean,
		default: false,
	},
	// LICENSES THAT THE PROPERTIE OWN
	licenses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'license',
		},
	],
};

const propertie = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('propertie', propertie),
	fields,
};
