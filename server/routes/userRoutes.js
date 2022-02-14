const router = require('express').Router();
const userController = require('../controllers/userController');
const deckController = require('../controllers/deckController');
const cardController = require('../controllers/cardController');

// User
router.get('/info', userController.getUsers);
router.post('/signup', userController.register);
router.post('/login', userController.login);
// Decks
router.get('/:userID/decks', deckController.getDecks);
router.post('/:userID/decks', deckController.addDeck);
router.patch('/:userID/deck/:deckID', deckController.updateDeck);
router.delete('/:userID/deck/:deckID', deckController.deleteDeck);
// Cards
router.get('/:userID/deck/:deckID/cards', cardController.getCards);
router.post('/:userID/deck/:deckID/cards', cardController.addCard);
router.patch('/:userID/deck/:deckID/card/:cardID', cardController.updateCard);
router.patch(
  '/:userID/deck/:deckID/card/:cardID/easy',
  cardController.easyCard
);
router.patch(
  '/:userID/deck/:deckID/card/:cardID/hard',
  cardController.hardCard
);
router.delete('/:userID/deck/:deckID/card/:cardID', cardController.deleteCard);
module.exports = router;
