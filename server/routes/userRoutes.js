const router = require('express').Router();
const userController = require('../controllers/userController');
const deckController = require('../controllers/deckController');
const cardController = require('../controllers/cardController');

// User
router.get('/info', userController.getUsers);
router.get('/profile/:userID', userController.profile);
router.post('/signup', userController.register);
router.post('/login', userController.login);
// Decks
router.get('/:userID/decks', deckController.getDecks);
router.post('/:userID/decks', deckController.addDeck);
router.patch('/:userID/deck/:deckID', deckController.updateDeck);
router.delete('/:userID/deck/:deckID', deckController.deleteDeck);

//_____ Card Controller

router.get('/:userID/deck/:deckID/cards', cardController.getCards); // Get due cards
router.get('/:userID/deck/:deckID/all', cardController.getAllCards); // Get all cards
router.post('/:userID/deck/:deckID/cards', cardController.addCard);
router.delete(
  '/:userID/deck/:deckID/card/:cardID/image/testing/:imageID',
  cardController.deleteCard
);
router.patch('/:userID/deck/:deckID/card/:cardID', cardController.updateCard);
router.delete('/:userID/deck/:deckID/card/:cardID', cardController.deleteCard)

router.patch('/:userID/deck/:deckID/card/:cardID/update-image', cardController.updateCardImage);

// router.post('/:userID/deck/:deckID/card/:cardID/uploadImage', cardController.uploadImage);
// router.delete('/:userID/deck/:deckID/card/:cardID/uploadImage', cardController.uploadImage);

router.patch('/:userID/deck/:deckID/card/:cardID/easy', cardController.easyCard);
router.patch('/:userID/deck/:deckID/card/:cardID/hard', cardController.hardCard);

//_____ Exports
module.exports = router;
