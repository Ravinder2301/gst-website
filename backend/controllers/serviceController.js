const mongoose = require('mongoose');
const Service = require('../models/Service');

const getServices = async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { isActive: true };
    const services = await Service.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: services.length, services });
  } catch (error) { next(error); }
};

const getServiceBySlug = async (req, res, next) => {
  try {
    const filter = { slug: req.params.slug };
    if (!req.admin) filter.isActive = true;
    const service = await Service.findOne(filter).lean();
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, service });
  } catch (error) { next(error); }
};

const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, message: 'Service created successfully.', service });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: 'A service with this slug already exists.' });
    next(error);
  }
};

const updateService = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid service ID.' });
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, message: 'Service updated successfully.', service });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: 'A service with this slug already exists.' });
    next(error);
  }
};

const deleteService = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid service ID.' });
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) { next(error); }
};

const updateServiceStatus = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid service ID.' });
    if (typeof req.body.isActive !== 'boolean') return res.status(400).json({ success: false, message: 'isActive must be true or false.' });
    const service = await Service.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true, runValidators: true }).lean();
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully.`, service });
  } catch (error) { next(error); }
};

module.exports = { getServices, getServiceBySlug, createService, updateService, deleteService, updateServiceStatus };
