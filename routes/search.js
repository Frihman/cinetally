var express = require('express');
var router = express.Router();
var https = require('https');



/* GET home page. */
router.get('/:query', function(req, res, next) {
    
    if (req.session.loggedIn == true) {
       
        res.render('search', { title: 'Search', email: req.session.Email});
    } else {
        res.redirect('/loginpage');
    }
});

module.exports = router;