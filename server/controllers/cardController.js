const sqlcon = require('../dbconnection');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

class cardController {
  // Create
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
  // Returns Certain Cards
  async getCards(req, res) {
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
  // Returrns All Cards
  async getAllCards(req, res) {

    console.log('welcome to getAllCards Controller');
    console.log(req.params);

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

  // Update
  async updateCard(req, res) {
    console.log('welcome to updateCard controller');
    console.log(req.body);
    console.log(req.params);
    try {
      const { front, hint, back } = req.body;

      console.log(req.body);

      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('card_id', req.params.cardID)
        .input('front', front)
        .input('hint', hint)
        .input('back', back)
        .execute('updateCard');
      res.json('Updated Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  // Delete
  async deleteCard(req, res) {
    console.log('welcome to deleteCard controller');
    
    try {
      // Delete image
      const imageID = req.url.substring(req.url.indexOf('/testing/') + 1);
      console.log(imageID);
      console.log(typeof imageID);
      if (imageID !== 'testing/null') {
        console.log('hello to cloudinary destroy');
        cloudinary.uploader.destroy(imageID, async (err) => {
          if (err) throw err;
        });
      }

      // Delete card details
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('card_id', req.params.cardID)
        .execute('deleteCard');
      res.json('Deleted Card');
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
  async uploadImage(req, res) {
    console.log('welcome to uploadImage controller');
    try {
      // Add image
      if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ msg: 'Please select an image' });

      const file = req.files.file;

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
          res.json({ imageID: result.public_id, imageURL: result.secure_url });
        }
      );
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  async updateCardImage(req, res) {
    console.log(req.body);
    try {
      const { imageID, imageURL } = req.body;
      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', req.params.deckID)
        .input('card_id', req.params.cardID)
        .input('imageID', imageID)
        .input('imageURL', imageURL)
        .execute('updateCardImage');
      res.send('Updated Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }

  async deleteImage(req, res) {

    console.log('In deleteImage()');

    const imageID  = req.params.imageID;

    console.log(imageID);
    
    try {

      if (!imageID) return res.status(400).json({ msg: 'No images Selected' });

      cloudinary.uploader.destroy('testing/' + imageID, async (err) => {
        if (err) throw err;
      });

      console.log('Updating card after image delete');

      const { deckID, cardID } = req.params;

      const newImageID = null;
      const newImageURL = null;

      const conn = await sqlcon.getConnection();
      await conn
        .request()
        .input('deck_id', deckID)
        .input('card_id', cardID)
        .input('imageID', newImageID)
        .input('imageURL', newImageURL)
        .execute('updateCardImage');
      res.json('Updated Card');
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
}
module.exports = new cardController();
