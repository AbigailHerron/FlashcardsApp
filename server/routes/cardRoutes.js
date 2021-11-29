const router = require('express').Router();
const cardController = require('../controllers/cardController');

router.get('/:id', cardController.getCards);
router.post('/:id', cardController.addCard);
router.patch('/:deckid/:id', cardController.updateCard);
router.delete('/:deckid/:id', cardController.deleteCard);
module.exports = router;
