var express = require('express');
var fs = require('fs');
var http = require('http');

var app = express();
var httpServer = http.Server(app);
app.use(express.static(__dirname + '/'))

//set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index', {});
});
var portNumber = process.env.PORT || 3000;
httpServer.listen(portNumber, function () {
	console.log('listening on *:3000');
});
