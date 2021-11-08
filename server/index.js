const express = require('express');
const sql = require('mssql');

// dot env package
require('dotenv').config();
const SERVER = process.env.SERVER;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB_PORT = process.env.DB_PORT;
const PORT = process.env.PORT;

const app = express();

// Connect to database
try {
  sql.connect({
    server: SERVER,
    user: USER,
    password: PASSWORD,
    database: USER,
    port: 1433,
    trustServerCertificate: true,
  });
  console.log('connected to database!');
} catch (err) {
  console.log(err);
}

app.listen(PORT);
