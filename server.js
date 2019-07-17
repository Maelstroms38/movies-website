var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', function(req, res){
  if(!req.body.imdbID){
    res.send("Error");
    return
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data), function(err, result) {
     if(err) {
      res.send("Error:", err);
      return
     }
     res.setHeader('Content-Type', 'application/json');
     res.send(data);
   });
});

app.listen(process.env.PORT || 3000, function() {
  return console.log("Listening on port 3000");
});