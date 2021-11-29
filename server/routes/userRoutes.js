const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/info', userController.getUsers);
router.post('/signup', userController.register);
router.post('/login', userController.login);
module.exports = router;
