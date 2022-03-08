const router = require('express').Router();
const deckController = require('../controllers/deckController');

router.get('/publicDecks', deckController.getPublicDecks);

module.exports = router;