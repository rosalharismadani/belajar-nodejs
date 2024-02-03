const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/auth/login', authController.login);
router.get('/auth/profil', authController.profil)

module.exports = router;