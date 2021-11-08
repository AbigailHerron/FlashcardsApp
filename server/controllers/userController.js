const sql = require('mssql');

exports.getUsers = async (req, res) => {
  try {
    const users = await sql.query('select * from UsersTBL');
    res.send(users.recorset);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { userID, username, email, password } = req.body;
    const request = new sql.Request();
    await request
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
