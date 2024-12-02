const nodemailer = require("nodemailer");
require('dotenv').config();


const  mail_Config = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
const transporter = nodemailer.createTransport(mail_Config);

module.exports = transporter;
