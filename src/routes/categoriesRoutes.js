const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/catgoriesController');

router.get('/category', categoriesController.getAll);
router.get('/category/:id', categoriesController.getById);
router.put('/category/:id', categoriesController.updateCategory);
router.post('/category', categoriesController.createCategory);
router.delete('/category/:id', categoriesController.deleteCategory);

module.exports = router;