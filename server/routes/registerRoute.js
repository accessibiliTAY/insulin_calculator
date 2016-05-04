var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/soloProject';

//var Users = require('../models/user');

router.get('/', function(req, res, next){
  res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.post('/', function(req, res, next){
  pg.connect(connectionString, function(err, client){

    var query = client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, req.body.password]);


    query.on('error', function(err){
      console.log(err);
    })
    query.on('end', function(){
      res.sendStatus(200);
    })
  })
});
module.exports = router;
