const express = require('express');
const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');

const { register, login, getMe, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.'
  }
});

const nameValidation = body('name')
  .trim()
  .notEmpty()
  .withMessage('Name is required.')
  .isLength({ max: 100 })
  .withMessage('Name must be 100 characters or fewer.');

const emailValidation = body('email')
  .trim()
  .isEmail()
  .withMessage('A valid email is required.')
  .normalizeEmail();

const passwordValidation = body('password')
  .isString()
  .isLength({ min: 8, max: 128 })
  .withMessage('Password must be between 8 and 128 characters.');

router.post(
  '/register',
  authLimiter,
  [nameValidation, emailValidation, passwordValidation],
  register
);

router.post(
  '/login',
  authLimiter,
  [emailValidation, body('password').isString().notEmpty().withMessage('Password is required.')],
  login
);

router.get('/me', authMiddleware, getMe);

router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
