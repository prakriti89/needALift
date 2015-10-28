var express = require('express');
var fs = require('fs');
var http = require('http');

var app = express();
var httpServer = http.Server(app);
app.use(express.static(__dirname + '/'))

//set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var meny = [
    { name: 'Hjem',
      id: 'header'
    },
    { name: 'Om Fyret',
      id: 'about'
    },
    { name: 'Galleri',
      id: 'gallery'
    },
    { name: 'Åpeningstid',
      id: 'openhours'
    },
    { name: 'Kontakt',
      id: 'contact'
    }
  ]
	res.render('index', {
    meny: meny
  });
});
var portNumber = process.env.PORT || 3000;
httpServer.listen(portNumber, function () {
	console.log('listening on *:3000');
});
