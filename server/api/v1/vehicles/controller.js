const { Model } = require('./model');
const { Model: userModel } = require('../users/model');

const config = require('../../../config');

const moment = require('moment');
const chalk = require('chalk');

// CREATE VEHICLE
exports.create = async (req, res, next) => {
	const { body } = req;

	var document = new Model(body);

	try {
		var doc = await document.save();
		const { _id } = doc;

		await res.status(201);

		await userModel.findByIdAndUpdate(body.owner, { $push: { vehicles: doc._id } });

		res.json({
			success: true,
			data: doc,
		});
	} catch (err) {
		next(new Error(err));
	}
};

// UPDATE VEHICLE
exports.update = async (req, res, next) => {
	const vehicleId = req.query.vehicleId;
	const owner = req.body.owner;
	const plate = req.body.plate;
	const date = req.body.date;
	const insurance = req.body.insurance;
	const insured = req.body.insured;

	const fields = {};
	if (owner) {
		fields.owner = owner;
		const oldVehicle = await Model.findById(vehicleId).select('owner');
		const oldOwner = oldVehicle.owner;
	}
	if (plate) fields.plate = plate;
	if (date) fields.date = date;
	if (insurance) fields.insurance = insurance;
	if (insured) fields.insured = insured;

	const vehicle = await Model.findByIdAndUpdate(vehicleId, { $set: fields }, { new: true });

	if (vehicle) {
		if (owner) {
			await userModel.findByIdAndUpdate(oldOwner, { $pull: { vehicles: vehicle._id } });
			await userModel.findByIdAndUpdate(owner, { $push: { vehicles: vehicle._id } });
		}
		res.json({
			updated: true,
			vehicle,
		});
	} else {
		res.json({
			updated: false,
			msg: 'Error updating the vehicle info',
		});
	}
};

// DELETE VEHICLE
exports.delete = async (req, res, next) => {
	const vehicleId = req.query.vehicleId;

	const vehicle = await Model.findByIdAndRemove(vehicleId);

	if (vehicle) {
		await userModel.findByIdAndUpdate(vehicle.owner, { $pull: { vehicles: vehicle._id } });
		res.json({
			deleted: true,
		});
	} else {
		res.json({
			deleted: false,
			msg: 'Error deleting the vehicle',
		});
	}
};

// GET VEHICLE
exports.getVehicle = async (req, res, next) => {
	const vehicleId = req.query.vehicleId;

	const vehicle = await Model.findById(vehicleId).populate('owner', 'name lastname wanted deceased');

	if (vehicle) {
		res.send(vehicle);
	} else {
		res.json({
			error: true,
			msg: 'Error getting the vehicle',
		});
	}
};

// GET ALL VEHICLES
exports.getAll = async (req, res, next) => {
	const vehicles = await Model.find();

	if (vehicles) {
		res.send(vehicles);
	} else {
		res.json({
			error: true,
			msg: 'Error getting all vehicles',
		});
	}
};
