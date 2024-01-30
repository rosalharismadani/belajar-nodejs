const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/catgoriesController');
const Authorization = require('../middleware/authorization')

router.get('/category', categoriesController.getAll);
router.get('/category/:id', categoriesController.getById);
router.put('/category/:id', Authorization.Authorization, categoriesController.updateCategory);
router.post('/category', Authorization.Authorization, categoriesController.createCategory);
router.delete('/category/:id', Authorization.Authorization, categoriesController.deleteCategory);

module.exports = router;