var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn == true) {
    res.render('index', { title: 'Home', email: req.session.Email});
  } else {
    res.redirect('/loginpage');
  }
});

module.exports = router;
