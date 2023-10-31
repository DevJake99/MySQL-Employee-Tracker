const mysql = require('mysql2');
// Using .env file for better security 
require("dotenv").config();

function dbConnect() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

    })
    return connection;
};

module.exports = dbConnect;