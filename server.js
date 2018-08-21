var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 5000;

var app = express(); // {}

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
  // Render refers to a View Engine
  response.render('index');
  // response.sendFile(path.join(__dirname, 'html/index.html'));
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

