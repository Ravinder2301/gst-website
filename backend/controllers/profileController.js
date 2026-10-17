const Profile = require('../models/Profile');

const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne().lean();
    res.json({ success: true, profile: profile || null });
  } catch (error) { next(error); }
};

const updateProfile = async (req, res, next) => {
  try {
    const allowed = [
      'name', 'businessName', 'designation', 'phone', 'whatsapp', 'email',
      'address', 'workingHours', 'about', 'experience', 'qualification',
      'mission', 'vision', 'logo', 'profileImage', 'socialLinks'
    ];
    const updates = {};
    for (const key of allowed) if (req.body[key] !== undefined) updates[key] = req.body[key];

    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).lean();

    res.json({ success: true, message: 'Profile updated successfully.', profile });
  } catch (error) { next(error); }
};

module.exports = { getProfile, updateProfile };
