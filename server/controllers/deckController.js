const sqlcon = require('../dbconnection');

class deckController {
  // Create
  async addDeck(req, res) {
    console.log('welcome to addDeck controller');
    try {
      const conn = await sqlcon.getConnection();

      console.log("Creating new card stack")

      // const { DeckName, About } = req.body;

      //  console.log(req.body.DeckName);
      //  console.log(req.body.About);

        await conn
        .request()
        .input('deck_name', req.body.DeckName)
        .input('about', req.body.About)
        .input('user_idFK', req.query.UserID)
        .execute('addDeck');

      res.send('Succesully Created Deck');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  // Read
  async getDecks(req, res) {
    console.log('welcome to getDecks controller');
    try {
      const conn = await sqlcon.getConnection();
      console.log(req.params);
      const decks = await conn
        .request()
        .input('user_idFK', req.params.userID)
        .execute('getDecks');
      res.json(decks.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  // Update
  async updateDeck(req, res) {
    console.log('welcome to updateDeck controller');
    try {
      const conn = await sqlcon.getConnection();
      const { deckname, about } = req.body;
      console.log(req.body);
      console.log(req.params);
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('user_id', req.params.userID)
        .input('deck_name', deckname)
        .input('about', about)
        .execute('updateDeck');
      res.send('Updated Deck');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  // Delete
  async deleteDeck(req, res) {
    console.log('welcome to deleteDeck controller');
    try {
      console.log(req.params);
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('user_id', req.params.userID)
        .execute('deleteDeck');
      res.send('Deleted Deck');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new deckController();
