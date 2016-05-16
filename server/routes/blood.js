var router = require('express').Router();
var pg = require('pg');

var connectionString = require ('../db/connection').connectionString;

router.post('/infoLog', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var result = [];
      var carbIntake = req.body.carbIntake;
      var bloodSugar = req.body.bloodSugar;
      var weight = req.body.weight;
      var meal = req.body.meal;
      var correctionDose = req.body.correctionDose;
      var final = req.body.final

      var query = client.query('INSERT INTO infoLog (carbIntake, bloodSugar, weight, meal, correctionDose, final) VALUES ($1, $2, $3, $4, $5, $6) ' +
                                'RETURNING id, carbIntake, bloodSugar, weight, meal, correctionDose, final', [carbIntake, bloodSugar, weight, meal, correctionDose, final]);

      query.on('row', function(row){
        result.push(row);
      });

      query.on('end', function() {
        done();
        res.send(result);
      });

      query.on('error', function(error) {
        console.error('Error running query:', error);
        done();
        res.status(500).send(error);
      });
    }
  });
});

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    if(err){

  console.log(err);
  res.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM infoLog');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        done();
        res.sendStatus(500);
      });

      query.on('row', function(rowData){
        results.push(rowData);

      });

      query.on('end', function(){
        res.send(results);
        done();
      });
    }
  });
});


module.exports = router;
