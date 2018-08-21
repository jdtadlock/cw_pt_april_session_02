var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var Sequelize = require('sequelize');
var sequelize = require('sequelize-heroku').connect(Sequelize);

var port = process.env.PORT || 5000;

var app = express(); // {}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync().then(() => console.log('synced'));

app.get('/', function (request, response) {
  // Render refers to a View Engine
  User.findAll()
    .then(function (users) {
      response.render('index', { users: users });
    });
  // response.sendFile(path.join(__dirname, 'html/index.html'));
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});



if ( !sequelize ) console.log('No environonment variable found.');









// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('cw_session_01', 'bd281b14c640dd', '1c629822', {
//   dialect: 'mysql',
//   operatorsAliases: false
// });



 



