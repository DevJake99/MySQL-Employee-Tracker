const mysql = require('mysql2');
// Using .env file for better security 
require("dotenv").config();



const connection = mysql.createConnection(
    {
        host: 'localhost',//process.env.DB_USER,
        user: 'root',
        password: 'root123!',
        database: 'company_db',
        // dialect: 'mysql'
    }
)




module.exports = connection;