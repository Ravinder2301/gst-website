const mongoose = require('mongoose');

const INQUIRY_STATUSES = [
  'New',
  'Contacted',
  'In Progress',
  'Completed',
  'Cancelled'
];

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, maxlength: 100 },
    phone: { type: String, trim: true, required: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true, default: '' },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
      index: true
    },
    message: { type: String, trim: true, default: '', maxlength: 2000 },
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      default: 'New',
      index: true
    }
  },
  { timestamps: true }
);

inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
module.exports.INQUIRY_STATUSES = INQUIRY_STATUSES;
