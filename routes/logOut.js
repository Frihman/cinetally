var express = require('express');
var router = express.Router();

/* GET logout */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn == true) {
        req.session.loggedIn = false;
        res.redirect('/loginpage');
    } else {
        res.redirect('/loginpage');
    }
});

module.exports = router;