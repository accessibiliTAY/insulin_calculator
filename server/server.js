var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

//var index = require('./routes/index');
var initializeDB = require('./db/connection').initializeDB;
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/soloProject';

var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash = require("flash");
var cookieParser = require('cookie-parser');
var register = require('./routes/registerRoute');
var users = require('./routes/usersRoute');

var blood = require('./routes/blood');
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

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.cookieParser());
// app.use(express.bodyParser())
// app.use(flash());
// app.use(express.session({ secret: 'so secret' }));
// app.use(app.router);
//////////PASSPORT//////////
passport.use('local', new LocalStrategy({
  passReqToCallback : true,
  usernameField: 'username'
},
  function(req, username, password, done){
    console.log('Checking password');
    pg.connect(connectionString, function(err, client){
      console.log('called local - pg');
        var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

        if(err){
          console.log(err);
        }

        var user = {};

      query.on('row', function(row){
        console.log('user obj', row);
        user = row;
        console.log(password, user.password, 'password');
        if (password === user.password){
          console.log('MATCH!');
          done(err, user);
        }else{
          console.log('no matches found');
          done(null, false);
        }
      });

      client.on('end', function (){
        client.end();
      })
    })
  }
));


passport.serializeUser(function(user,done){
  console.log('Hit serializeUser');
  done(null,user.id);
});

passport.deserializeUser(function(id, passportDone){
  console.log('called deserializeUser');
  pg.connect(connectionString, function (err, client, done){

    if(err){
      console.log(err);
    }
      var user = {};


    var query = client.query("SELECT * FROM users WHERE id = $1", [id]);

    query.on('row', function (row){
      console.log('user row', row);
      user = row;
      passportDone(null, user);
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
//app.use('insulinCal/infoLog', blood);



// app.get('/*', function(request, response) {
//     response.sendFile(path.join(__dirname, '../public/views/index.html'));
// })




//listen
app.listen(port, function() {
  console.log('listening on port', port);
});
