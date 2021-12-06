const sqlcon = require('../dbconnection');

class deckController {
  async addDeck(req, res) {
    console.log('welcome to addDeck controller');
    try {
      const conn = await sqlcon.getConnection();

      const { deckname, about, userID } = req.body;

      console.log(req.body);

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
      
      const { userID } = req.body; // USER ID REQUIRED
      
      const decks = await conn
        .request()
        .input('user_idFK', 25) // ACCEPT USER ID
        .execute('getDecks');
      
      res.json(decks.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  async updateDeck(req, res) {
    console.log('welcome to updateDeck controller');
    try {
      const conn = await sqlcon.getConnection();
      const { deckname, about } = req.body;
      await conn
        .request()
        .input('deck_id', req.params.id)
        .input('deck_name', deckname)
        .input('about', about)
        .execute('updateDeck');
      res.send('Updated Deck');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  async deleteDeck(req, res) {
    console.log('welcome to deleteDeck controller');
    try {
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.id)
        .execute('deleteDeck');
      res.send('Deleted Deck');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new deckController();
