const router = require('express').Router();
const deckController = require('../controllers/deckController');

router.get('/', deckController.getDecks);
router.post('/', deckController.addDeck);
module.exports = router;
