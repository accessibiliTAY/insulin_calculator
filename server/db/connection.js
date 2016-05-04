var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  console.log('environment var');
  connectionString = process.env.DATABASE_URL;
} else {
  console.log('local var');
  connectionString = 'postgres://localhost:5432/soloProject';
}
function initializeDB(){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('Error connecting to DB', err);
      process.exit(1);
    }else{
      var query = client.query('CREATE TABLE IF NOT EXISTS users (' +
      'id SERIAL PRIMARY KEY,' +
      'username varchar(80) NOT NULL,' +
      'password varchar(80) NOT NULL)');

      query.on('end', function(){
        console.log('successfully ensured schema exists');
        done();
      });

      query.on('error', function(){
        console.log('Error creating schema');
        process.exit(1);
      });
    }
  });
}
module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
