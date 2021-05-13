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

router.get('/movie/:id', function(req, res, next) {
  if(req.session.loggedIn) {
    mySQLQuery(`SELECT * FROM Movie WHERE ImdbId = '${req.params.id}' AND UserId = '${req.session.Id}'`, function(result) {
      res.send(result);
    });
  } else {
    res.send('access denied');
  }
  
});

router.get('/movie', function(req, res, next) {
  if(req.session.loggedIn) {
    mySQLQuery(`SELECT * FROM Movie WHERE UserId = '${req.session.Id}'`, function(result) {
      res.send(result);
    });
  } else {
    res.send('access denied');
  }
});

router.post('/movie/inactive', function(req, res, next) {
  if(req.session.loggedIn) {
    mySQLQuery(`INSERT INTO Movie_inactive (ImdbId, Title, Year, Poster, Watched, UserId) VALUES ('${req.body.imdbID}', '${req.body.Title.replace(/'/g, "''")}', '${req.body.Year}', '${req.body.Poster}', 0, ${req.session.Id})`, function() {
      mySQLQuery(`DELETE FROM Movie WHERE ImdbId = '${req.body.imdbID}' AND UserId = '${req.session.Id}'`, function(result) {
        res.send(result);
      });
    });
  } else {
    res.send('access denied');
  }
  
});

router.post('/login', function(req, res, next) {
  mySQLQuery(`SELECT * FROM User WHERE Email = '${req.body.Email.replace(/'/g, "''")}'`, function(result) {
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
    mySQLQuery(`SELECT * FROM User WHERE Email = '${req.body.Email.replace(/'/g, "''")}'`, function(result) {
      if (result.length < 1) {
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.Password, salt, function(err, hash) {
              mySQLQuery(`INSERT INTO User (Email, Password) VALUES ('${req.body.Email.replace(/'/g, "''")}', '${hash}')`, function(result) {
                mySQLQuery(`SELECT * FROM User WHERE Email = '${req.body.Email.replace(/'/g, "''")}'`, function(result) {
                  console.log(result);
                  req.session.loggedIn = true;
                  req.session.Id = result[0].Id;
                  req.session.Email = result[0].Email;
                  res.redirect('/');
                });
                
                
              });
          });
        });
  
      } else {
        res.send('user alerady exists!');
      }
    });
  
  
  
});

router.post('/movie', function(req, res, next) {
  if(req.session.loggedIn) {
    mySQLQuery(`SELECT * FROM Movie_inactive WHERE ImdbId = '${req.body.imdbID}' AND UserId = '${req.session.Id}'`, function(result) {
      let insertResult = result;
      if(result.length > 0) {
        mySQLQuery(`INSERT INTO Movie (ImdbId, Title, Year, Poster, Rating, Watched, UserId) VALUES ('${req.body.imdbID}', '${req.body.Title.replace(/'/g, "''")}', '${req.body.Year}', '${req.body.Poster}', ${result[0].Rating}, ${result[0].Watched}, ${req.session.Id})`, function(result) {
          mySQLQuery(`DELETE FROM Movie_inactive WHERE ImdbId = '${insertResult[0].ImdbId}' AND UserId = '${req.session.Id}'`, function() {
            res.send(result);
          });          
          
        });
      } else {
        mySQLQuery(`INSERT INTO Movie (ImdbId, Title, Year, Poster, Watched, UserId) VALUES ('${req.body.imdbID}', '${req.body.Title.replace(/'/g, "''")}', '${req.body.Year}', '${req.body.Poster}', 0, '${req.session.Id}')`, function(result) {
          res.send(result);
        });
      }
    });
    
    
  } else {
    res.send('access denied');
  }
  
  
});

router.delete('/movies', function(req, res, next) {
  if (req.session.loggedIn) {
    var query = '';
    
    for (let i = 0; i < req.body.length; i++) {
       if (i == req.body.length - 1)  {
         query += `'${req.body[i]}')`;
       } else {
         query += `'${req.body[i]}', `;
       }
    }
    mySQLQuery(`SELECT * FROM Movie WHERE ImdbId IN (${query}`, function(result) {
      var insertResult = result;
      
      var query = '';

      for(let i = 0; i < insertResult.length; i++) {
        if (i == insertResult.length - 1) {
          query += `('${insertResult[i].ImdbId}', '${insertResult[i].Title}', '${insertResult[i].Year}', '${insertResult[i].Poster}', '${insertResult[i].Watched}', '${insertResult[i].UserId}')`;
        } else {
          query += `('${insertResult[i].ImdbId}', '${insertResult[i].Title}', '${insertResult[i].Year}', '${insertResult[i].Poster}', '${insertResult[i].Watched}', '${insertResult[i].UserId}'), `;
        }
        
        
      }
      mySQLQuery(`INSERT INTO Movie_inactive (ImdbId, Title, Year, Poster, Watched, UserId) VALUES ` + query, function() {
        var query = '';
        for (let i = 0; i < req.body.length; i++) {
          if (i == req.body.length - 1)  {
            query += `'${req.body[i]}')`;
          } else {
            query += `'${req.body[i]}', `;
          }
        }
        
        mySQLQuery(`DELETE FROM Movie WHERE ImdbId IN (${query} AND UserId = '${req.session.Id}'`, function(result) {
          res.send(result);
        });
      });
    });
    
  } else {
    res.send('access denied');
  }
  
});

module.exports = router;
