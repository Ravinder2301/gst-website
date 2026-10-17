const jwt = require('jsonwebtoken');

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be configured and contain at least 32 characters.');
  }

  return secret;
};

const generateToken = (admin) => {
  return jwt.sign(
    {
      sub: admin._id.toString(),
      role: admin.role
    },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
};

const verifyToken = (token) => jwt.verify(token, getJwtSecret());

module.exports = { generateToken, verifyToken };
