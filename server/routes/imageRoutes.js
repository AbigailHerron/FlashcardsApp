const router = require('express').Router();
const cardController = require('../controllers/cardController');

router.post('/upload', cardController.uploadImage);
router.delete('/delete', cardController.deleteImage);

module.exports = router;
