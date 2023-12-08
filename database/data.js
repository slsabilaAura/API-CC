require('dotenv').config();

const { createPool } = require("mysql");


const mysql = createPool({
  host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  JWT_KEY:process.env.JWT_KEY,
  connectionLimit: 10,
 
});


module.exports = mysql;