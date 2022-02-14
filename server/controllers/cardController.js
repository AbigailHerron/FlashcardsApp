const sqlcon = require('../dbconnection');

class cardController {
  // Create
  async addCard(req, res) {
    console.log('welcome to addCard controller');

    try {
      const conn = await sqlcon.getConnection();

      await conn
        .request()
        .input('front', req.body.Front)
        .input('back', req.body.Back)
        .input('deckID', req.params.deckID)
        .execute('addCard');

      res.json('You created a Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  // Read
  async getCards(req, res) {
    // console.log('welcome to getCards Controller');
    // console.log(req.params);
    try {
      const conn = await sqlcon.getConnection();
      const cards = await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('user_id', req.params.userID)
        .execute('getCards');
      res.json(cards.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  // Update
  async updateCard(req, res) {
    console.log('welcome to updateCard controller');
    console.log(req.body);
    console.log(req.params);
    try {
      const { front, back } = req.body;
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('card_id', req.params.cardID)
        .input('front', front)
        .input('back', back)
        .execute('updateCard');
      res.send('Updated Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  // Delete
  async deleteCard(req, res) {
    console.log('welcome to deleteCard controller');
    try {
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('card_id', req.params.cardID)
        .execute('deleteCard');
      res.send('Deleted Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  // EASY
  async easyCard(req, res) {
    console.log('welcome to easyCard controller');
    try {
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('card_id', req.params.cardID)
        .execute('easyCard');
      res.send('Card marked as easy');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  // HARD
  async hardCard(req, res) {
    console.log('welcome to hardCard controller');
    try {
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('card_id', req.params.cardID)
        .execute('hardCard');
      res.send('Card marked as hard');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new cardController();
