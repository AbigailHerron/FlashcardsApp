const router = require('express').Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getUsers).post(userController.addUser);
module.exports = router;
