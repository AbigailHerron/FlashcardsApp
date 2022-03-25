const router = require('express').Router();
const userController = require('../controllers/userController');
const deckController = require('../controllers/deckController');
const cardController = require('../controllers/cardController');

// User
router.get('/info', userController.getUsers);
router.get('/profile/:userID', userController.profile);
router.post('/signup', userController.register);
router.post('/login', userController.login);

// Edit details / delete account

router.patch('/profile/:userID/username', userController.updateUserName)
router.patch('/profile/:userID/email', userController.updateEmail)
router.delete('/profile/:userID', userController.deleteAccount)

// Decks
router.get('/:userID/decks', deckController.getDecks);
router.post('/:userID/decks', deckController.addDeck);
router.patch('/:userID/deck/:deckID', deckController.updateDeck);
router.delete('/:userID/deck/:deckID', deckController.deleteDeck);

// Cards

router.get('/:userID/deck/:deckID/cards', cardController.getCards); // Get due cards
router.get('/:userID/deck/:deckID/all', cardController.getAllCards); // Get all cards
router.post('/:userID/deck/:deckID/cards', cardController.addCard);

// Images
router.delete('/:userID/deck/:deckID/card/:cardID/image/testing/:imageID', cardController.deleteImage);

router.patch('/:userID/deck/:deckID/card/:cardID', cardController.updateCard);
router.patch(
  '/:userID/deck/:deckID/card/:cardID/update-image',
  cardController.updateCardImage
);
router.patch(
  '/:userID/deck/:deckID/card/:cardID/easy',
  cardController.easyCard
);
router.patch(
  '/:userID/deck/:deckID/card/:cardID/hard',
  cardController.hardCard
);

//_____ Exports
module.exports = router;
