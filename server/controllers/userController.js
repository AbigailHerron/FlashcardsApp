const sql = require('mssql');
const sqlcon = require('../dbconnection');

exports.getUsers = async (req, res) => {
  console.log('welcome to getUsers controller');
  try {
    const conn = await sqlcon.getConnection();
    const users = await conn.query('select * from UsersTBL');
    res.send(users.recordset);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.addUser = async (req, res) => {
  console.log('welcom to addUser controller');
  try {
    const conn = await sqlcon.getConnection();
    const { userID, username, email, password } = req.body;
    console.log(username);
    await conn
      .request()
      .input('user_id', userID)
      .input('user_name', username)
      .input('user_email', email)
      .input('user_password', password)
      .execute('addUser');
    res.send('Created a new User');
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
