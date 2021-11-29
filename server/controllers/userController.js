const sqlcon = require('../dbconnection');
const bcrypt = require('bcrypt');

class userController {
  // For Testing Only
  async getUsers(req, res) {
    console.log('welcome to getUsers controller');
    try {
      const conn = await sqlcon.getConnection();
      const users = await conn.query('select * from UsersTBL');
      res.send(users.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  async register(req, res) {
    console.log('welcom to addUser controller');
    try {
      const conn = await sqlcon.getConnection();
      const { username, email, password } = req.body;
      // Check if there's existing users in the database
      const existingUser = await conn
        .request()
        .input('user_email', email)
        .execute('getUser');
      if (existingUser.rowsAffected[0] == 1)
        return res.status(400).json({ msg: 'This user already exists' });
      // Hash the Password
      const passwordHash = await bcrypt.hash(password, 10);
      // Save to database
      await conn
        .request()
        .input('user_name', username)
        .input('user_email', email)
        .input('user_password', passwordHash)
        .execute('addUser');
      // Send User Data
      const user = await conn
        .request()
        .input('user_email', email)
        .execute('login');
      res.send(user.recordset[0]);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  async login(req, res) {
    console.log('welcome to login controller');
    try {
      const conn = await sqlcon.getConnection();
      const { email, password } = req.body;
      // Check if there's existing users in the database
      const existingUser = await conn
        .request()
        .input('user_email', email)
        .execute('getUser');
      if (existingUser.rowsAffected[0] == 0)
        return res.status(400).json({ msg: 'User does not exist' });
      // validate Password
      const isMatch = await bcrypt.compare(
        password,
        existingUser.recordset[0].UserPass
      );
      if (!isMatch) return res.status(400).json({ msg: 'Invalid details!' });
      // Send User Data

      const user = await conn
        .request()
        .input('user_email', email)
        .execute('login');

        //Send back user details
      //res.send(user.recordset[0]);  

       //Send back user details
       res.send(true);  
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new userController();
