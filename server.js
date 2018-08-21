var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 5000;

var Sequelize = require('sequelize');
var sequelize = new Sequelize('cw_session_01', 'root', '', {
  dialect: 'mysql',
  operatorsAliases: false
});

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync().then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

 

var app = express(); // {}

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
  // Render refers to a View Engine
  User.findAll()
    .then(function(users) {
      response.render('index', {users: users});
    });
  // response.sendFile(path.join(__dirname, 'html/index.html'));
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

