const sqlcon = require('../dbconnection');

class deckController {
  async addDeck(req, res) {
    console.log('welcome to addDeck controller');
    try {
      const conn = await sqlcon.getConnection();
      const { deckname, about, userID } = req.body;

      await conn
        .request()
        .input('deck_name', deckname)
        .input('about', about)
        .input('user_idFK', userID)
        .execute('addDeck');
      res.send('You created a Deck');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  async getDecks(req, res) {
    console.log('welcome to getDecks controller');
    try {
      const conn = await sqlcon.getConnection();
      const { userID } = req.body;
      const decks = await conn
        .request()
        .input('user_idFK', userID)
        .execute('getDecks');
      res.send(decks);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new deckController();
