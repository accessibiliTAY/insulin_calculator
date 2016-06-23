var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var pg = require('pg');
var blood = require('./blood');



router.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/search',
        failureRedirect: '/',
        failure: true
    })
);
// router.use('/infoLog', blood);


module.exports = router;
