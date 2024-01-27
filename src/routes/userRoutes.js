const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Authorization = require('../middleware/authorization')

router.get('/user', Authorization.Authorization, userController.getAll);
router.get('/user/:id', userController.getById);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);


module.exports = router;