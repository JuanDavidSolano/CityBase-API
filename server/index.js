const express = require('express');
const connectDB = require('./database');
const bodyParser = require('body-parser');
const api = require('./api/index');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');

const chalk = require('chalk');

const logger = require('winston');

//  Conexion a BD
connectDB();

// Inicializacion de aplicacion express
const app = express();

app.set('key', config.key.key);

app.use(cors());

app.use(bodyParser.json());

// Setup Router and routes
app.use('/api', api);

// handle middlewares errors
app.use((req, res, next) => {
	const message = 'These arent the Droids youre looking for ~(0-0)~';

	logger.info(message);

	res.status(404);
	res.json({
		error: true,
		message,
	});
});

module.exports = app;
