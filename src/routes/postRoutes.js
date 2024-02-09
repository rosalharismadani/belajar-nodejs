const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const Authorization = require('../middleware/authorization')

router.get('/post', postController.getAll);
router.get('/post/:id', postController.getById);
router.get('/post/get-by-slug/:slug', postController.getBySlug);
router.post('/post', Authorization.Authorization, postController.createPost);
router.put('/post/:id', Authorization.Authorization, postController.updatePost)
router.delete('/post/:id', Authorization.Authorization, postController.deletePost)

module.exports = router;