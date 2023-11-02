const mysql = require('mysql2/promise');
// Using .env file for better security 
require("dotenv").config();

async function dbConnect() {
    const db = await mysql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    return db
};
module.exports = dbConnect;