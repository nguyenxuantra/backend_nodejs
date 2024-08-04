require('dotenv').config()
const mysql = require('mysql2/promise');

// Create the connection to database
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
  })


  module.exports = connection;