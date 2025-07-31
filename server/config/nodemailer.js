import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER, // your SMTP email
    pass: process.env.SMTP_PASS, // your SMTP password or API key
  },
});

export default transporter;
