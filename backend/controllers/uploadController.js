const fs = require('fs');

const buildUrl = (req, filename) => `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(filename)}`;

const uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image to upload.' });
    }
    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully.',
      url: buildUrl(req, req.file.filename),
      filename: req.file.filename
    });
  } catch (error) {
    if (req.file?.path) fs.rm(req.file.path, { force: true }, () => {});
    next(error);
  }
};

module.exports = { uploadImage };
