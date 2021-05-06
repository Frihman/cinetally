var express = require('express');
var router = express.Router();
var mySQLQuery = require('../node_functions/mySQLQuery');
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
    var data = result[0];
    if (result.length > 0) {
      bcrypt.compare(req.body.Password, result[0].Password, function(err, result) {
        if (result == true) {
          req.session.loggedIn = true;
          req.session.Id = data.Id;
          req.session.Email = data.Email;
          res.redirect('/');
        } else {
          res.redirect('/loginpage');
        }
      });
    } else {
      res.redirect('/loginpage');
    }
    
  });
});

router.post('/users', function(req, res, next) {
  mySQLQuery(`SELECT * FROM User WHERE Email = '${req.body.Email}'`, function(result) {
    var data = result[0];
    if (result.length < 1) {
      
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.Password, salt, function(err, hash) {
            mySQLQuery(`INSERT INTO User (Email, Password) VALUES ('${req.body.Email}', '${hash}')`, function(result) {
              req.session.loggedIn = true;
              req.session.Id = data.Id;
              req.session.Email = data.Email;
              res.redirect('/');
            });
        });
      });

    } else {
      res.send('user alerady exists!');
    }
  });
  
});

module.exports = router;
