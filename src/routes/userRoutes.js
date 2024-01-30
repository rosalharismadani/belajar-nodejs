const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Authorization = require('../middleware/authorization')

router.get('/user', Authorization.AuthorizationSuperAdmin, userController.getAll);
router.get('/user/:id', Authorization.Authorization, userController.getById);
router.post('/user', Authorization.AuthorizationSuperAdmin, userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', Authorization.AuthorizationSuperAdmin, userController.deleteUser);


module.exports = router;