const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/post', postController.getAll);

module.exports = router;