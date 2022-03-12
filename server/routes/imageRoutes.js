const router = require('express').Router();
const cardController = require('../controllers/cardController');

router.post('/upload', cardController.uploadImage);
router.post('/delete', cardController.deleteImage);

module.exports = router;
