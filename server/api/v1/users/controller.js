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

	const user = await Model.findOne({ username: username }).select('password name lastname role');

	if (user) {
		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				const payload = {
					check: true,
					name: user.name,
					lastname: user.lastname,
					role: user.role,
				};
				const token = jwt.sign(payload, config.key.key, {
					expiresIn: 1440,
				});
				res.json({
					msg: 'Authenticated',
					token: token,
				});
			} else {
				res.json({
					msg: 'Not authenticated',
				});
			}
		});
	} else {
		res.send('Error authenticating');
	}
};
