const sqlcon = require('../dbconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const secret = process.env.ACCESS_TOKEN_SECRET;

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

      console.log(passwordHash);
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

//################################################## LOGIN

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

      console.log(existingUser.recordset[0].UserPass);

      console.log(password);

      let passwordHash = await bcrypt.hash(password, 10);

      console.log(passwordHash);

      // validate Password
      const isMatch = await bcrypt.compare(
        password,
        existingUser.recordset[0].UserPass
      );
      
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Details' });

      // Send User Data
      const user = await conn
        .request()
        .input('user_email', email)
        .execute('login');

      //Send back user details
      //res.send(user.recordset[0]);  

      // set the payload for the jwt.
      let payload = {};
      payload.UserID = user.recordset[0].UserID;
      payload.UserEmail = user.recordset[0].UserEmail;

      // sign the jwt and return it in the body of the request.       
      let token = jwt.sign(payload, secret, { expiresIn: 60 });
      res.status(201).json({ 
      accessToken: token,
      UserID: user.recordset[0].UserID,
      UserEmail: user.recordset[0].UserEmail });
      console.log('login success');

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new userController();
