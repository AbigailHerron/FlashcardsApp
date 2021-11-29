const router = require('express').Router();
const cardController = require('../controllers/cardController');

router.get('/:id', cardController.getCards);
router.post('/:id', cardController.addCard);
module.exports = router;
