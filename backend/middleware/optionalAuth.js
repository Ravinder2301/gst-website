const Admin = require('../models/Admin');
const { verifyToken } = require('../utils/jwt');

const optionalAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || '';
    if (!authorization.startsWith('Bearer ')) return next();
    const token = authorization.slice(7).trim();
    if (!token) return next();
    const decoded = verifyToken(token);
    if (!decoded.sub) return next();
    const admin = await Admin.findById(decoded.sub);
    if (admin && admin.role === 'admin') req.admin = admin;
    next();
  } catch { next(); }
};
module.exports = optionalAuth;
