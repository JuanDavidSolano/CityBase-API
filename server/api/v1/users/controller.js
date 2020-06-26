const { Model } = require('./model');
const config = require('../../../config');

const moment = require('moment');
const chalk = require('chalk');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// SIGNUP
exports.signup = async (req, res, next) => {
	const { body } = req;

	var document = new Model(body);

	try {
		var doc = await document.save();
		const { _id } = doc;

		res.status(201);
		res.json({
			success: true,
			data: doc,
		});
	} catch (err) {
		next(new Error(err));
	}
};

// AUTH
exports.login = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = await Model.findOne({ username: username })
		.select('password name lastname role wanted deceased username organization')
		.populate('organization', 'name');

	if (user) {
		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				const payload = {
					check: true,
					username: user.username,
					name: user.name,
					lastname: user.lastname,
					organization: user.organization || 'Ninguna',
					role: user.role,
					wanted: user.wanted,
					deceased: user.deceased,
					accesToCriminalHistory: user.accesToCriminalHistory,
					accesToMedicalHistory: user.accesToMedicalHistory,
				};
				const token = jwt.sign(payload, config.key.key, {
					expiresIn: 1440,
				});
				res.json({
					msg: 'Authenticated',
					auth: true,
					token: token,
				});
			} else {
				res.json({
					msg: 'Not authenticated',
					auth: false,
				});
			}
		});
	} else {
		res.json({
			msg: 'Error authenticating',
			auth: false,
		});
	}
};

/*
 *	GETS  *
 */

// GET INSURANCES
exports.getInsurances = async (req, res, next) => {
	const username = req.query.username;

	const user = await Model.findOne({ username: username }).select('insurances').populate('insurances');

	if (user) {
		res.json(user);
	} else {
		res.send('User not found');
	}
};

// GET LICENSES
exports.getLicenses = async (req, res, next) => {
	const username = req.query.username;

	const user = await Model.findOne({ username: username }).select('licenses').populate('licenses');

	if (user) {
		res.json(user);
	} else {
		res.send('User not found');
	}
};

// GET PROPERTIES
exports.getProperties = async (req, res, next) => {
	const username = req.query.username;

	const user = await Model.findOne({ username: username }).select('properties').populate('properties');

	if (user) {
		res.json(user);
	} else {
		res.send('User not found');
	}
};

// GET PROPERTIES
exports.getVehicles = async (req, res, next) => {
	const username = req.query.username;

	const user = await Model.findOne({ username: username }).select('vehicles').populate('vehicles');

	if (user) {
		res.json(user);
	} else {
		res.send('User not found');
	}
};

// GET MEDICAL HISTORY
exports.getMedicalHistory = async (req, res, next) => {
	const username = req.query.username;

	const user = await Model.findOne({ username: username }).select('medicalHistory').populate('medicalHistory');

	if (user) {
		res.json(user);
	} else {
		res.send('User not found');
	}
};

// GET CRIMINAL HISTORY
exports.getCriminalHistory = async (req, res, next) => {
	const username = req.query.username;

	const user = await Model.findOne({ username: username }).select('criminalHistory').populate('criminalHistory');

	if (user) {
		res.json(user);
	} else {
		res.send('User not found');
	}
};

/*
 *	PUTS  *
 */

// UPDATE USER BASIC INFORMATION
exports.update = async (req, res, next) => {
	const username = req.query.username;
	const newusername = req.body.username;
	const name = req.body.name;
	const lastname = req.body.lastname;
	const password = req.body.password;
	const birthDate = req.body.birthDate;

	const userFields = {};

	if (newusername) userFields.username = newusername;
	if (name) userFields.name = name;
	if (lastname) userFields.lastname = lastname;
	if (password) userFields.password = bcrypt.hashSync(password, 10);
	if (birthDate) userFields.birthDate = birthDate;

	const user = await Model.findOneAndUpdate({ username: username }, { $set: userFields }, { new: true });
	if (user) {
		const payload = {
			check: true,
			username: user.username,
			name: user.name,
			lastname: user.lastname,
			organization: user.organization,
			role: user.role,
			wanted: user.wanted,
			deceased: user.deceased,
		};
		const token = jwt.sign(payload, config.key.key, {
			expiresIn: 1440,
		});
		res.json({
			updated: true,
			token: token,
		});
	} else {
		res.json({
			updated: false,
			msg: 'Error updating user basic information',
		});
	}
};

// SET ORGANIZATION
exports.setOrganization = async (req, res, next) => {
	const username = req.body.username;
	const organizationId = req.body.organizationId;
	const role = req.body.role;

	const user = await Model.findOneAndUpdate(
		{ username: username },
		{ $set: { organization: organizationId, role: role } },
		{ new: true }
	);
	if (user) {
		const payload = {
			check: true,
			username: user.username,
			name: user.name,
			lastname: user.lastname,
			organization: user.organization,
			role: user.role,
			wanted: user.wanted,
			deceased: user.deceased,
			accesToCriminalHistory: user.accesToCriminalHistory,
			accesToMedicalHistory: user.accesToMedicalHistory,
		};
		const token = jwt.sign(payload, config.key.key, {
			expiresIn: 1440,
		});
		res.json({
			updated: true,
			token: token,
		});
	} else {
		res.json({
			updated: false,
			msg: 'Error updating user organization or role',
		});
	}
};

// SET HISTORY ACCESS
exports.setHistoryAccess = async (req, res, next) => {
	const username = req.body.username;
	const accesToMedicalHistory = req.body.accesToMedicalHistory;
	const accesToCriminalHistory = req.body.accesToCriminalHistory;

	const fields = {};

	if (accesToMedicalHistory) fields.accesToMedicalHistory = accesToMedicalHistory;
	if (accesToCriminalHistory) fields.accesToCriminalHistory = accesToCriminalHistory;

	const user = await Model.findOneAndUpdate({ username: username }, { $set: fields }, { new: true });
	if (user) {
		const payload = {
			check: true,
			username: user.username,
			name: user.name,
			lastname: user.lastname,
			organization: user.organization,
			role: user.role,
			wanted: user.wanted,
			deceased: user.deceased,
			accesToCriminalHistory: user.accesToCriminalHistory,
			accesToMedicalHistory: user.accesToMedicalHistory,
		};
		const token = jwt.sign(payload, config.key.key, {
			expiresIn: 1440,
		});
		res.json({
			updated: true,
			token: token,
		});
	} else {
		res.json({
			updated: false,
			msg: 'Error updating user HistoryAccess',
		});
	}
};

// SET DECEASED
exports.setDeceased = async (req, res, next) => {
	const username = req.body.username;
	const deceased = req.body.deceased;

	const user = await Model.findOneAndUpdate({ username: username }, { $set: { deceased: deceased } }, { new: true });
	if (user) {
		const payload = {
			check: true,
			username: user.username,
			name: user.name,
			lastname: user.lastname,
			organization: user.organization,
			role: user.role,
			wanted: user.wanted,
			deceased: user.deceased,
			accesToCriminalHistory: user.accesToCriminalHistory,
			accesToMedicalHistory: user.accesToMedicalHistory,
		};
		const token = jwt.sign(payload, config.key.key, {
			expiresIn: 1440,
		});
		res.json({
			updated: true,
			token: token,
		});
	} else {
		res.json({
			updated: false,
			msg: 'Error updating user deceased status',
		});
	}
};

// SET WANTED
exports.setWanted = async (req, res, next) => {
	const username = req.body.username;
	const wanted = req.body.wanted;

	const user = await Model.findOneAndUpdate({ username: username }, { $set: { wanted: wanted } }, { new: true });
	if (user) {
		const payload = {
			check: true,
			username: user.username,
			name: user.name,
			lastname: user.lastname,
			organization: user.organization,
			role: user.role,
			wanted: user.wanted,
			deceased: user.deceased,
			accesToCriminalHistory: user.accesToCriminalHistory,
			accesToMedicalHistory: user.accesToMedicalHistory,
		};
		const token = jwt.sign(payload, config.key.key, {
			expiresIn: 1440,
		});
		res.json({
			updated: true,
			token: token,
		});
	} else {
		res.json({
			updated: false,
			msg: 'Error updating user wanted status',
		});
	}
};
