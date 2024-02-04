const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/post', postController.getAll);
router.get('/post/:id', postController.getById);
router.get('/post/get-by-slug/:slug', postController.getBySlug);
router.post('/post', postController.createPost);
router.put('/post/:id', postController.updatePost)

module.exports = router;