const router = require('express').Router();
const deckController = require('../controllers/deckController');

router.get('/:id/decks', deckController.getDecks);
router.post('/:id/decks', deckController.addDeck);
router.patch('/:id/decks/:deckid', deckController.updateDeck);
router.delete('/:id/decks/:deckid', deckController.deleteDeck);
router.get('/:id', cardController.getCards);
router.post('/:id', cardController.addCard);
router.patch('/:deckid/:id', cardController.updateCard);
router.delete('/:deckid/:id', cardController.deleteCard);
module.exports = router;
