var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn == true) {
    res.redirect('/');
  } else {
    res.render('login', { title: 'Log In' });
  }
});

module.exports = router;