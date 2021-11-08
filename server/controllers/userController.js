const sql = require('mssql');

exports.getUsers = async (req,res) => {
  try {
    const users = await sql.query("select * from UsersTBL");
    res.send(users);
  }
  catch(err){
    res.send(err);
  }
}