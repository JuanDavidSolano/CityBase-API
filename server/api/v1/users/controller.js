const { Model } = require('./model');

const moment = require('moment');
const chalk = require('chalk');
const bcrypt = require('bcrypt');

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

	const user = await Model.findOne({ username: username }).select('password');

	if (user) {
		bcrypt.compare(password, user.password, function (err, result) {
			if (result) {
				res.json({
					auth: true,
				});
			} else {
				res.json({
					auth: false,
				});
			}
		});
	} else {
		res.send('Error authenticating');
	}
};
