const Resend = require('resend').Resend;

module.exports = new Resend(process.env.RESEND_API_KEY);