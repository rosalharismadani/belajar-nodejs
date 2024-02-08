const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const Authorization = require('../middleware/authorization')
const { upload } = require('../middleware/multer')

router.post('/upload', upload.single('document'), Authorization.Authorization, uploadController.upload)

module.exports = router;