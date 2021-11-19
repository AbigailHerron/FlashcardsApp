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
        .input('user_password', { password: passwordHash }.password)
        .execute('addUser');
      res.send('Created a new User');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new userController();
