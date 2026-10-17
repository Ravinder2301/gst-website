const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, trim: true, required: true },
    answer: { type: String, trim: true, required: true }
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    slug: { type: String, trim: true, lowercase: true, required: true, unique: true, index: true },
    shortDescription: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    benefits: { type: [String], default: [] },
    documents: { type: [String], default: [] },
    process: { type: [String], default: [] },
    faqs: { type: [faqSchema], default: [] },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
