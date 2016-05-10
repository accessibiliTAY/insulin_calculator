var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var pg = require('pg');




router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/*', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
})

router.post('/',
  passport.authenticate('local',{
  successRedirect: '/apiSearch',
  failureRedirect: '/users',
  failure: true
})
);

module.exports = router;
