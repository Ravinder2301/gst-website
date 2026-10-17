const normalizeWhatsAppNumber = (number) => String(number || '').replace(/\D/g, '');

const createInquiryWhatsAppUrl = (inquiry, number) => {
  const recipient = normalizeWhatsAppNumber(number);
  const message = [
    'New GST/Tax Service Inquiry',
    '',
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.phone}`,
    `Email: ${inquiry.email || 'Not provided'}`,
    `Service: ${inquiry.service}`,
    `Message: ${inquiry.message || 'Not provided'}`
  ].join('\n');

  const base = recipient ? `https://wa.me/${recipient}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
};

module.exports = { normalizeWhatsAppNumber, createInquiryWhatsAppUrl };
