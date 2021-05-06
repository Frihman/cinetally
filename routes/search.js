var express = require('express');
var router = express.Router();
var httpRequest = require('../node_functions/httpRequest');
var getJSON = httpRequest.getJSON;



/* GET home page. */
router.get('/:query', function(req, res, next) {
    var query = encodeURI(req.params.query);
    if (req.session.loggedIn == true) {
        var options = {
            host: 'omdbapi.com',
            path: `/?apikey=24bf22de&s=${query}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        getJSON(options, function(result) {
            res.render('search', { title: 'Search', email: req.session.Email, movieList: result.Search});
        });
        
    } else {
        res.redirect('/loginpage');
    }
});

module.exports = router;