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
    'image1.JPG',
    'image2.JPG',
    'image3.JPG',
    'middag-4.jpg',
    'image4.JPG',
    'image5.JPG',
    'image6.JPG',
    'image7.JPG',
    'burger.jpg',
    'image8.jpg',
    'image10.jpg',
    'image9.JPG',
    'image11.JPG',
    'image12.JPG'
  ];
  var first_horizontal_pictures = pictures.slice(0,9);
  var vertical_pictures = pictures.slice(9,11);
  var second_horizontal_pictures = pictures.slice(11,14);
  
	res.render('index', {
    meny: meny,
    pictures: pictures,
    first_horizontal_pictures: first_horizontal_pictures,
    vertical_pictures: vertical_pictures,
    second_horizontal_pictures: second_horizontal_pictures
  });
});
var portNumber = process.env.PORT || 3000;
httpServer.listen(portNumber, function () {
	console.log('listening on *:3000');
});
