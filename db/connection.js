// This is where you have to put in the password and the things like that

const mysql = require('mysql2');

//Connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    // the MYSQL username or or just the roo user since there was no username set up
    user: 'root',
    // the MySQL password
    password: 'Pass@7326',
    // connecting tot he local database
    database: 'employee_db'
});

// Exporting the module so it will connect with app.js
module.exports = db;