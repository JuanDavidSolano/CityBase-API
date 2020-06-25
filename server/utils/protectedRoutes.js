const jwt = require('jsonwebtoken');
const protectedRoutes = require('express').Router();

const config = require('../config');

protectedRoutes.use((req, res, next) => {
	const token = req.headers['access-token'];

	if (token) {
		jwt.verify(token, config.key.key, (err, decoded) => {
			if (err) {
				return res.json({ mensaje: 'Token inválida' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.send({
			mensaje: 'Token no proveída.',
		});
	}
});

module.exports = protectedRoutes;
