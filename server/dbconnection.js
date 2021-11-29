const sql = require('mssql');

// dot env package
require('dotenv').config();
const SERVER = process.env.SERVER;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

class DBConnection {
  async getConnection() {
    try {
      return await sql.connect({
        server: SERVER,
        user: USER,
        password: PASSWORD,
        database: USER,
        port: 1433,
        trustServerCertificate: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new DBConnection();
