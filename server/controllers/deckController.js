const sqlcon = require('../dbconnection');

class deckController {
  // Create
  async addDeck(req, res) {
    console.log('welcome to addDeck controller');

    try {
      const conn = await sqlcon.getConnection();

      console.log("Creating new card stack")

      const { DeckName, About } = req.body;
       console.log(DeckName);
       console.log(About)

        const deck = await conn
        .request()
        .input('deck_name', DeckName)
        .input('about', About)
        .input('user_idFK', req.params.userID)
        .execute('addDeck');

        res.json(deck.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  // Read
  async getDecks(req, res) {
    console.log('welcome to getDecks controller');
    try {
      const conn = await sqlcon.getConnection();

      const decks = await conn
        .request()
        .input('user_idFK', req.params.userID)
        .execute('getDecks');
      res.json(decks.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  // Read public decks
  async getPublicDecks(req, res) {
    console.log('welcome to getPublicDecks controller');
    try {
      const conn = await sqlcon.getConnection();

      const decks = await conn
        .request()
        .execute('getPublicDecks');
        
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
      const { deckname, about, publicDeck, colour } = req.body;
      console.log(req.body);
      console.log(req.params);

      var publicBit;

      if (publicDeck == true)
      {
        publicBit = 1;
      } else {
        publicBit = 0;
      }

      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('user_id', req.params.userID)
        .input('deck_name', deckname)
        .input('about', about)
        .input('publicDeck', publicBit)
        .input('colour', colour)
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
      console.log(req.params.deckID);
      console.log(req.params.userID);

      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('user_id', req.params.userID)
        .execute('deleteDeck');

      res.json('Deleted Deck');

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new deckController();
