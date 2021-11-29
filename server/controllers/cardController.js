const sqlcon = require('../dbconnection');

class cardController {
  async addCard(req, res) {
    console.log('welcome to addCard controller');
    try {
      const conn = await sqlcon.getConnection();
      const { front, back } = req.body;

      await conn
        .request()
        .input('front', front)
        .input('back', back)
        .input('deckID', req.params.id)
        .execute('addCard');
      res.send('You created a Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  async getCards(req, res) {
    console.log('welcome to getCards Controller');
    try {
      const conn = await sqlcon.getConnection();
      const cards = await conn
        .request()
        .input('deckID', req.params.id)
        .execute('getCards');
      res.json(cards.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new cardController();
