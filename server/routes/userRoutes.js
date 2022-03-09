const router = require('express').Router();
const userController = require('../controllers/userController');
const deckController = require('../controllers/deckController');
const cardController = require('../controllers/cardController');

// User
router.get('/info', userController.getUsers);
<<<<<<< HEAD
=======
router.get('/profile/:userID', userController.profile);
>>>>>>> 08b1042 (images fully working)
router.post('/signup', userController.register);
router.post('/login', userController.login);
// Decks
router.get('/:userID/decks', deckController.getDecks);
router.post('/:userID/decks', deckController.addDeck);
router.patch('/:userID/deck/:deckID', deckController.updateDeck);
router.delete('/:userID/deck/:deckID', deckController.deleteDeck);
// Cards
router.get('/:userID/deck/:deckID/cards', cardController.getCards);
router.get('/:userID/deck/:deckID/all', cardController.getAllCards);
router.post('/:userID/deck/:deckID/cards', cardController.addCard);
router.patch('/:userID/deck/:deckID/card/:cardID', cardController.updateCard);
<<<<<<< HEAD

//New routes
=======
router.patch(
  '/:userID/deck/:deckID/card/:cardID/update-image',
  cardController.updateCardImage
);

>>>>>>> 08b1042 (images fully working)
router.patch(
  '/:userID/deck/:deckID/card/:cardID/easy',
  cardController.easyCard
);
router.patch(
  '/:userID/deck/:deckID/card/:cardID/hard',
  cardController.hardCard
);
<<<<<<< HEAD

//Image routes
// router.post('/:userID/deck/:deckID/card/:cardID/uploadImage', cardController.uploadImage);
// router.delete('/:userID/deck/:deckID/card/:cardID/uploadImage', cardController.uploadImage);
=======
>>>>>>> 08b1042 (images fully working)

module.exports = router;
