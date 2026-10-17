const express = require('express');
const { body, validationResult } = require('express-validator');
const { createInquiry, getInquiries, getInquiryById, updateInquiry, deleteInquiry } = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const validateInquiry = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 100 }).withMessage('Name is too long.'),
  body('phone').trim().matches(/^[6-9]\d{9}$/).withMessage('Enter a valid Indian mobile number.'),
  body('email').optional({ values: 'falsy' }).trim().isEmail().withMessage('Enter a valid email address.'),
  body('service').trim().notEmpty().withMessage('Service is required.').isLength({ max: 150 }).withMessage('Service is too long.'),
  body('message').optional().trim().isLength({ max: 2000 }).withMessage('Message is too long.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Validation failed.', errors: errors.array() });
    next();
  }
];

router.post('/', validateInquiry, createInquiry);
router.get('/', authMiddleware, getInquiries);
router.get('/:id', authMiddleware, getInquiryById);
router.put('/:id', authMiddleware, updateInquiry);
router.delete('/:id', authMiddleware, deleteInquiry);
module.exports = router;
