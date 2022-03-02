const sqlcon = require('../dbconnection');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

var imageUrl;

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

class cardController {

  //_____ Create card

  async addCard(req, res) {
    console.log('welcome to addCard controller');
    try {
    //Add card data
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('front', req.body.Front)
        .input('back', req.body.Back)
        // .input('imgUrl', result.secure_url)
        .input('deckID', req.params.deckID)
        .execute('addCard');

      res.json('You created a Card');

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  
  //_____ Get due cards

  async getCards(req, res) {
    console.log('welcome to getCards Controller');
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
  
  //_____ Get all cards

  async getAllCards(req, res) {
    console.log('welcome to getCards Controller');
    try {
      const conn = await sqlcon.getConnection();
      const cards = await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('user_id', req.params.userID)
        .execute('getAllCards');
      res.json(cards.recordset);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  //_____ Update card

  async updateCard(req, res) {
    console.log('welcome to updateCard controller');
    try {
      // Add image
    if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).json({ msg: 'Please select an image' });

    const file = req.files.file;
    console.log(file);
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'Image is too large' });
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return res
        .status(400)
        .json({ msg: 'Please select a png or jpeg format' });
    }

    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: 'testing' },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        imageUrl = result.secure_url
        // res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );

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

  //_____ Delete card

  async deleteCard(req, res) {
    console.log('welcome to deleteCard controller');
    try {

      // Delete image 
      const { public_id } = req.params;
      if (!public_id) return res.status(400).json({ msg: 'No images Selected' });
  
      cloudinary.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;
        res.json({ msg: 'Deleted Image' });
      });

      // Delete card details
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

  //_____ Set difficulty to easy

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
  
  //_____ Set difficulty to hard

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

//_____ Exports

module.exports = new cardController();
