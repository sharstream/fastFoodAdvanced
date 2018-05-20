require('dot-env').config;

var mysql = require('mysql');

var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DATABASE_PASSWORD,
        database: 'food_db'
    });
};

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db ' + err.stack);
        return;
    }
    console.log('Connection established as id ' + connection.threadId);
});

module.exports = connection;