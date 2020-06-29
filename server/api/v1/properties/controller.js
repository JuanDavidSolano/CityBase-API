const { Model } = require('./model');
const { Model: userModel, fields } = require('../users/model');

const config = require('../../../config');

const moment = require('moment');
const chalk = require('chalk');

// CREATE PROPERTY
exports.create = async (req, res, next) => {
	const { body } = req;

	var document = new Model(body);

	try {
		var doc = await document.save();
		const { _id } = doc;

		await res.status(201);

		await userModel.findByIdAndUpdate(body.owner, { $push: { properties: doc._id } });

		res.json({
			success: true,
			data: doc,
		});
	} catch (err) {
		next(new Error(err));
	}
};

// UPDATE PROPERTY
exports.update = async (req, res, next) => {
	const propertyId = req.query.propertyId;
	const owner = req.body.owner;
	const name = req.body.name;
	const price = req.body.price;
	const type = req.body.type;

	const fields = {};
	if (owner) {
		fields.owner = owner;
		const oldProperty = await Model.findById(propertyId).select('owner');
		const oldOwner = oldProperty.owner;
	}
	if (name) fields.name = name;
	if (price) fields.price = price;
	if (type) fields.type = type;

	const property = await Model.findByIdAndUpdate(propertyId, { $set: fields }, { new: true });

	if (property) {
		if (owner) {
			if (oldOwner) {
				await userModel.findByIdAndUpdate(oldOwner, { $pull: { properties: property._id } });
			}
			await userModel.findByIdAndUpdate(owner, { $push: { properties: property._id } });
		}
		res.json({
			updated: true,
			property,
		});
	} else {
		res.json({
			updated: false,
			msg: 'Error updating the property info',
		});
	}
};

// DELETE PROPERTY
exports.delete = async (req, res, next) => {
	const propertyId = req.query.propertyId;

	const property = await Model.findByIdAndRemove(propertyId);

	if (property) {
		await userModel.findByIdAndUpdate(property.owner, { $pull: { properties: property._id } });
		res.json({
			deleted: true,
		});
	} else {
		res.json({
			deleted: false,
			msg: 'Error deleting the property',
		});
	}
};

// REMOVE PROPERTY
exports.remove = async (req, res, next) => {
	const propertyId = req.query.propertyId;

	const property = await Model.findByIdAndUpdate(propertyId, { $set: { owner: '' } }, { new: true });

	if (vehicle) {
		await userModel.findByIdAndUpdate(property.owner, { $pull: { properties: property._id } });
		res.json({
			removed: true,
		});
	} else {
		res.json({
			removed: false,
			msg: 'Error removing the property',
		});
	}
};

// GET PROPERTY
exports.getProperty = async (req, res, next) => {
	const propertyId = req.query.propertyId;

	const property = await Model.findById(propertyId).populate('owner', 'name lastname');

	if (property) {
		res.send(property);
	} else {
		res.json({
			error: true,
			msg: 'Error getting the property',
		});
	}
};

// GET ALL PROPERTIES
exports.getAll = async (req, res, next) => {
	const properties = await Model.find();

	if (properties) {
		res.send(properties);
	} else {
		res.json({
			error: true,
			msg: 'Error getting all properties',
		});
	}
};

// MAKE A PAYMENT
exports.addPay = async (req, res, next) => {
	const propertyId = req.query.propertyId;
	const amount = req.query.amount;
	const date = req.query.date;

	const property = await Model.findById(propertyId);

	fields = {};
	fields.lastPayDate = date;
	fields.lastPay = amount;
	if (property.debt - amount <= 0) {
		fields.debt = 0;
		fields.payed = true;
	} else {
		fields.debt = property.debt - amount;
	}

	const newProperty = await Model.findByIdAndUpdate({ propertyId }, { $set: fields }, { new: true });

	if (newProperty) {
		res.json({
			updated: true,
			newProperty,
		});
	}
	{
		res.json({
			updated: false,
			msg: 'Error making the property payment',
		});
	}
};
