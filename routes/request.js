var express = require('express');
var router = express.Router();
var mySQLQuery = require('../node_functions/mySQLQuery');
var session = require('express-session');
var bcrypt = require('bcrypt');
var saltRounds = 10;

/* GET users listing. */
router.get('/users', function(req, res, next) {
  mySQLQuery('SELECT * FROM User', function(result) {
    res.send(result);
  });
});

router.post('/login', function(req, res, next) {
  mySQLQuery(`SELECT * FROM User WHERE Email = '${req.body.Email}'`, function(result) {
    if (result.length > 0) {
      bcrypt.compare(req.body.Password, result[0].Password, function(err, result) {
        if (result == true) {
          res.send('Logged in!');
        } else {
          res.send('Error logging in!');
        }
    });
    } else {
      res.send('Error logging in!');
    }
    
  });
});

router.post('/users', function(req, res, next) {
  mySQLQuery(`SELECT * FROM User WHERE Email = '${req.body.Email}'`, function(result) {
    if (result.length < 1) {
      
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.Password, salt, function(err, hash) {
            mySQLQuery(`INSERT INTO User (Email, Password) VALUES ('${req.body.Email}', '${hash}')`, function(result) {
              res.send('User created!');
            });
        });
      });

    } else {
      res.send('user alerady exists!');
    }
  });
  
});

module.exports = router;
