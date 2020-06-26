const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	name: {
		type: String,
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
	insured: {
		type: Boolean,
		default: false,
	},
};

const vehicle = new Schema(fields, { timestamps: true });

module.exports = {
	Model: mongoose.model('vehicle', vehicle),
	fields,
};
