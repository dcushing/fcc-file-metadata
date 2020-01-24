'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');

/*
I can submit a form that includes a file upload.
The from file input field has the "name" attribute set to "upfile". We rely on this in testing.
When I submit something, I will receive the file name and size in bytes within the JSON response
*/


var app = express();
var upload = multer({dest: 'assets/'});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req,res,next) {
  var fileName = req.file.originalname;
  var size = req.file.size;
  res.json({"name": fileName, "size": size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
