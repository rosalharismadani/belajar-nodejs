const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const Authorization = require('../middleware/authorization')

router.post('/auth/login', authController.login);
router.get('/profil', Authorization.Authorization, authController.profil)

module.exports = router;