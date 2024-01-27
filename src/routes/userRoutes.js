const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', userController.getAll);
router.get('/user/:id', userController.getById);


module.exports = router;