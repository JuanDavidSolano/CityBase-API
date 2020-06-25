const app = require('./server');

const config = require('./server/config');

const PORT = process.env.PORT || 5000;

const server = require('http').createServer(app);

app.get('/', (req, res) => {
	res.send('API ejecutandose correctamente');
	console.log('hola');
});

server.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log('App now running on port', port);
});
