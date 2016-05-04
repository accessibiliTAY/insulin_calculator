var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

//var index = require('./routes/index');
var initializeDB = require('./db/connection').initializeDB;

var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

var register = require('./routes/registerRoute');
var users = require('./routes/usersRoute');

////////////import modules//////////
var index = require('./routes/index');



//////////// config /////////////
app.use(express.static('server/public'));
app.use(bodyParser.json());
initializeDB();
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie:{maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//////////PASSPORT//////////
passport.use('local', new localStrategy({passReqToCallback : true, usernameField: 'username'},
  function(req, username, password, done){
    console.log('called local');
    pg.connect(connectionString, function(err, client){
      console.log('called local - pg');
      var user = {};
      var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

      query.on('row',function(row){
        console.log('user obj', row);
        console.log('password', password);
        user = row;
        if (password == user.password){
          console.log('MATCH!');
          done(null, user);
        }else{
          done(null, false, {message: 'Incorrect Username and Password.'});
        }
      });

      query.on('end', function (){
        client.end();
        res.send(results);
      });

      if (err){
        console.log(err);
      }
    });
}));


passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(user,done){
  console.log('called deserializeUser');
  pg.connect(connection, function (err, client){
    var user = {};
    console.log('called deserializeUser - pg');
    var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

    query.on('row', function (row){
      console.log('user row', row);
      user = row;
      done(null, user);
    });

    query.on('end', function(){
      client.end();
    });
    if (err){
      console.log(err);
    }
  });
});

///////////routes/////////////
app.use('/', index);
app.use('/register', register);
app.use('/users', users);









//listen
app.listen(port, function() {
  console.log('listening on port', port);
});
