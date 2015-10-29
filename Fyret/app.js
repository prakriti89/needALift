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
  ];
  var pictures = [
    'img/gallery/image1.JPG',
    'img/gallery/image2.JPG',
    'img/gallery/image3.JPG',
    'img/gallery/middag-4.jpg',
    'img/gallery/image4.JPG',
    'img/gallery/image5.JPG',
    'img/gallery/image6.JPG',
    'img/gallery/image7.JPG',
    'img/gallery/burger.jpg',
    'img/gallery/image8.jpg',
    'img/gallery/image9.JPG',
    'img/gallery/image10.jpg',
    'img/gallery/image11.JPG',
    'img/gallery/image12.JPG'
  ];
	res.render('index', {
    meny: meny,
    pictures: pictures
  });
});
var portNumber = process.env.PORT || 3000;
httpServer.listen(portNumber, function () {
	console.log('listening on *:3000');
});
