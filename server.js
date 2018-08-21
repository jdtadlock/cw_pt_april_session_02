var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var aws = require('aws-sdk');

// var s3 = new aws.S3({
//   db_url: process.env.DATABASE_URL
// });

var port = process.env.PORT || 5000;

var sequelize = require('sequelize-heroku').connect(require('sequelize'));

if (sequelize) {
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


  sequelize.authenticate().then(function () {
    var config = sequelize.connectionManager.config;
    console.log('sequelize-heroku: Connected to ' + config.host + ' as ' + config.username + '.');

    sequelize.query('SELECT 1+1 as test').then(function (res) {
      console.log('1+1=' + res[0][0].test);
    });

  }).catch(function (err) {
    var config = sequelize.connectionManager.config;
    console.log('Sequelize: Error connecting ' + config.host + ' as ' + config.user + ': ' + err);
  });
} else {
  console.log('No environnement variable found.');
}

// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('cw_session_01', 'bd281b14c640dd', '1c629822', {
//   host: 'mysql://bd281b14c640dd:1c629822@us-cdbr-iron-east-01.cleardb.net/heroku_df77992b0c37b87?reconnect=true',
//   dialect: 'mysql',
//   operatorsAliases: false
// });



 

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

