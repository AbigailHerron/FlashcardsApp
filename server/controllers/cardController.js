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
  async updateCard(req, res) {
    console.log('welcome to updateCard controller');
    try {
      const { front, back } = req.body;
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckid)
        .input('card_id', req.params.id)
        .input('front', front)
        .input('back', back)
        .execute('updateCard');
      res.send('Updated Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  async deleteCard(req, res) {
    console.log('welcome to deleteCard controller');
    try {
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckid)
        .input('card_id', req.params.id)
        .execute('deleteCard');
      res.send('Deleted Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new cardController();
