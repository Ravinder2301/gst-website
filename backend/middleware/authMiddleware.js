const Admin = require('../models/Admin');
const { verifyToken } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || '';

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const decoded = verifyToken(token);

    if (!decoded.sub) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    const admin = await Admin.findById(decoded.sub).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found.'
      });
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied.'
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    next(error);
  }
};

module.exports = authMiddleware;
