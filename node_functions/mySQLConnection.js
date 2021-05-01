var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '188.150.94.223',
    user: 'remote',
    password: 'James0314',
    port: 3306,
    database: 'cinetally'
});

module.exports = connection;