const express = require('express');
const sql = require('mssql');

// dot env package
require('dotenv').config();
const SERVER = process.env.SERVER;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;

const userRouter = require('./routes/userRoutes');
console.log('signedcommits?');
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

app.use('/user', userRouter);

app.listen(PORT);
