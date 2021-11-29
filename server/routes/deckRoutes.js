const router = require('express').Router();
const deckController = require('../controllers/deckController');

router.get('/', deckController.getDecks);
router.post('/', deckController.addDeck);
router.patch('/:id', deckController.updateDeck);
router.delete('/:id', deckController.deleteDeck);
module.exports = router;
