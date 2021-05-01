var express = require('express');
var router = express.Router();
var mySQLQuery = require('../node_functions/mySQLQuery');

/* GET users listing. */
router.get('/', function(req, res, next) {
  mySQLQuery('SELECT * FROM User', function(result) {
    res.send(result);
  });
});

module.exports = router;
