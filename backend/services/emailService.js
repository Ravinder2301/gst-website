const nodemailer = require('nodemailer');

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  return transporter;
};

const sendInquiryNotification = async (inquiry) => {
  const mailer = getTransporter();
  const recipient = process.env.OWNER_EMAIL;
  if (!mailer || !recipient) {
    console.warn('Inquiry email not sent: EMAIL_USER, EMAIL_PASS or OWNER_EMAIL is not configured.');
    return false;
  }

  const createdAt = new Date(inquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  await mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: 'New GST & Tax Service Inquiry',
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>New GST &amp; Tax Service Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email || 'Not provided')}</p>
        <p><strong>Service:</strong> ${escapeHtml(inquiry.service)}</p>
        <p><strong>Message:</strong><br>${escapeHtml(inquiry.message || 'Not provided').replace(/\n/g, '<br>')}</p>
        <p><strong>Date &amp; Time:</strong> ${escapeHtml(createdAt)}</p>
      </div>`
  });
  return true;
};

module.exports = { sendInquiryNotification };
