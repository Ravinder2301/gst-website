const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');
const { sendInquiryNotification } = require('../services/emailService');
const { createInquiryWhatsAppUrl } = require('../utils/whatsapp');

const getInquiryPayload = (body) => ({
  name: body.name?.trim(),
  phone: body.phone?.trim(),
  email: body.email?.trim() || undefined,
  service: body.service?.trim(),
  message: body.message?.trim() || ''
});

const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(getInquiryPayload(req.body));
    try { await sendInquiryNotification(inquiry); }
    catch (emailError) { console.error('Inquiry email notification failed:', emailError.message); }

    const whatsappNumber = process.env.WHATSAPP_NUMBER || '';
    const whatsappUrl = createInquiryWhatsAppUrl(inquiry, whatsappNumber);
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', whatsappUrl });
  } catch (error) { next(error); }
};

const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('service', 'title slug')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: inquiries.length,
      inquiries
    });
  } catch (error) {
    next(error);
  }
};

const getInquiryById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID.'
      });
    }

    const inquiry = await Inquiry.findById(req.params.id)
      .populate('service', 'title slug')
      .lean();

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.'
      });
    }

    res.json({
      success: true,
      inquiry
    });
  } catch (error) {
    next(error);
  }
};

const updateInquiry = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid inquiry ID.' });
    const allowed = ['name', 'phone', 'email', 'service', 'message', 'status'];
    const updates = {};
    for (const key of allowed) if (req.body[key] !== undefined) updates[key] = typeof req.body[key] === 'string' ? req.body[key].trim() : req.body[key];
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).lean();
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    res.json({ success: true, message: 'Inquiry updated successfully.', inquiry });
  } catch (error) { next(error); }
};

const deleteInquiry = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid inquiry ID.' });
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) { next(error); }
};

module.exports = { createInquiry, getInquiries, getInquiryById, updateInquiry, deleteInquiry };
