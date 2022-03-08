const router = require('express').Router();
const userController = require('../controllers/userController');
const deckController = require('../controllers/deckController');
const cardController = require('../controllers/cardController');

//_____ User Controller

router.get('/info', userController.getUsers);
router.get('/profile/:userID', userController.profile)
router.post('/signup', userController.register);
router.post('/login', userController.login);

//_____ Deck Controller

router.get('/:userID/decks', deckController.getDecks);
router.post('/:userID/decks', deckController.addDeck);
router.patch('/:userID/deck/:deckID', deckController.updateDeck);
router.delete('/:userID/deck/:deckID', deckController.deleteDeck);

//_____ Card Controller

router.get('/:userID/deck/:deckID/cards', cardController.getCards);
router.get('/:userID/deck/:deckID/all', cardController.getAllCards);
router.post('/:userID/deck/:deckID/cards', cardController.addCard);
router.patch('/:userID/deck/:deckID/card/:cardID', cardController.updateCard);

router.post(
  '/:userID/deck/:deckID/card/:cardID/uploadImage',
  cardController.uploadImage
);
router.delete(
  '/:userID/deck/:deckID/card/:cardID/uploadImage',
  cardController.uploadImage
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
