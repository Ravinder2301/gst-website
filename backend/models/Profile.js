const mongoose = require('mongoose');

const socialLinksSchema = new mongoose.Schema(
  {
    instagram: { type: String, trim: true, default: '' },
    facebook: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' }
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    businessName: { type: String, trim: true, required: true },
    designation: { type: String, trim: true, default: 'GST & Tax Consultant' },
    phone: { type: String, trim: true, default: '' },
    whatsapp: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    address: { type: String, trim: true, default: '' },
    workingHours: { type: String, trim: true, default: '' },
    about: { type: String, trim: true, default: '' },
    experience: { type: String, trim: true, default: '' },
    qualification: { type: String, trim: true, default: '' },
    mission: { type: String, trim: true, default: '' },
    vision: { type: String, trim: true, default: '' },
    logo: { type: String, trim: true, default: '' },
    profileImage: { type: String, trim: true, default: '' },
    socialLinks: { type: socialLinksSchema, default: () => ({}) }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
