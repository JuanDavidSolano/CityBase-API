const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const chalk = require('chalk');

const { Schema } = mongoose;

const fields = {
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	birthDate: {
		type: String,
		required: true,
	},
	role: {
		type: 'String',
		default: 'Ciudadano',
	},
	organization: {
		type: Schema.Types.ObjectId,
		ref: 'organization',
	},
	licenses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'license',
		},
	],
	medicalHistory: {
		type: Schema.Types.ObjectId,
		ref: 'medicalHistory',
	},
	criminalHistory: {
		type: Schema.Types.ObjectId,
		ref: 'criminalHistory',
	},
	properties: [
		{
			type: Schema.Types.ObjectId,
			ref: 'propertie',
		},
	],
	wanted: {
		type: Boolean,
		default: false,
	},
	accesToCriminalHistory: {
		type: Boolean,
		default: false,
	},
	accesToMedicalHistory: {
		type: Boolean,
		default: false,
	},
	deceased: {
		type: Boolean,
		default: false,
	},
	insurances: [
		{
			type: Schema.Types.ObjectId,
			ref: 'insurance',
		},
	],
};

const user = new Schema(fields, { timestamps: true });
user.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

module.exports = {
	Model: mongoose.model('user', user),
	fields,
};
