const router = require('express').Router();
const userController = require('../controllers/userController');
const deckController = require('../controllers/deckController');
const cardController = require('../controllers/cardController');

// User
router.get('/info', userController.getUsers);
router.post('/signup', userController.register);
router.post('/login', userController.login);
// Decks
router.get('/:id/decks', deckController.getDecks);
router.post('/:id/decks', deckController.addDeck);
router.patch('/:id/deck/:deckid', deckController.updateDeck);
router.delete('/:id/deck/:deckid', deckController.deleteDeck);
// Cards
router.get('/:id', cardController.getCards);
router.post('/:id', cardController.addCard);
router.patch('/:deckid/:id', cardController.updateCard);
router.delete('/:deckid/:id', cardController.deleteCard);
module.exports = router;
