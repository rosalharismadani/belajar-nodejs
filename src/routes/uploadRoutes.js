const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { upload } = require('../middleware/multer')

router.post('/upload', upload.single('document'), uploadController.upload)

module.exports = router;