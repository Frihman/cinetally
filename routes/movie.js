var express = require('express');
var router = express.Router();
var httpRequest = require('../node_functions/httpRequest');
var getJSON = httpRequest.getJSON;



/* GET home page. */
router.get('/:id', function(req, res, next) {
    if (req.session.loggedIn == true) {
        var options = {
            host: 'omdbapi.com',
            path: `/?apikey=24bf22de&i=${req.params.id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        getJSON(options, function(result) {
            res.render('movie', { title: result.Title, email: req.session.Email, movieList: result});
        });
        
    } else {
        res.redirect('/loginpage');
    }
});

module.exports = router;