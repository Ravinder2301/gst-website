const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { generateToken } = require('../utils/jwt');

const sanitizeAdmin = (admin) => ({
  id: admin._id.toString(),
  name: admin.name,
  email: admin.email,
  role: admin.role
});

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array()
      });
    }

    // Phase 3 intentionally supports creation of the initial admin only.
    // Later admin management can be added behind authentication.
    const existingAdmin = await Admin.exists({});

    if (existingAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin registration is closed because an admin account already exists.'
      });
    }

    const { name, email, password } = req.body;
    const admin = await Admin.create({ name, email, password, role: 'admin' });

    const token = generateToken(admin);

    return res.status(201).json({
      success: true,
      message: 'Admin account created successfully.',
      token,
      admin: sanitizeAdmin(admin)
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An admin account with this email already exists.'
      });
    }

    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array()
      });
    }

    const email = req.body.email.toLowerCase().trim();
    const { password } = req.body;

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const passwordMatches = await admin.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(admin);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      admin: sanitizeAdmin(admin)
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: sanitizeAdmin(req.admin)
  });
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    if (newPassword.length < 12) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 12 characters long.'
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from the current password.'
      });
    }

    // authMiddleware must attach the authenticated admin to req.admin.
    const adminId = req.admin?._id || req.admin?.id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found.'
      });
    }

    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.'
      });
    }

    // Your Admin model's pre-save hook should hash this password.
    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully. Please log in again.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, changePassword };
