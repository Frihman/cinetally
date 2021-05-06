var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET logout */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn == true) {
        req.session.destroy();
        res.redirect('/loginpage');
    } else {
        res.redirect('/loginpage');
    }
});

module.exports = router;