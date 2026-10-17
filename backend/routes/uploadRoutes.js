const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const imageUpload = require('../middleware/upload');
const { uploadImage } = require('../controllers/uploadController');

const router = express.Router();

router.post('/logo', authMiddleware, imageUpload.single('image'), uploadImage);
router.post('/profile', authMiddleware, imageUpload.single('image'), uploadImage);

module.exports = router;
