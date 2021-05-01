var connection = require('./mySQLConnection');

function mySQLQuery(query, callback) {
    connection.query(query, function(error, result, field) {
        if (error) throw error;
        callback(result);
    });
}

module.exports = mySQLQuery;