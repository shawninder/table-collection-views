var
	// http
	http = require('http'),
	// express
	express = require('express'),
	// APP
	app = express(),
	http_port = 5000,

	// underscore	
	_ = require('./public/lib/underscore.js'),

	// eliminate the need for a database
	people = [
		{ firstName: 'Tom', lastName: 'Cruise' },
		{ firstName: 'Dick', lastName: 'Cheney' },
		{ firstName: 'Harry', lastName: 'Potter' }
	];

app.configure(function() {
	// add middleware
	app.use(express.static(__dirname + '/public'))
		.use(express.static(__dirname + '/public/lib'))
});

// ROUTES
app.get('/person', function (req, res) {
	res.send(people);
});


// Start listening for HTTP requests
httpServer = http.createServer(app).listen(http_port);
console.log('HTTP server listening on port', http_port);
