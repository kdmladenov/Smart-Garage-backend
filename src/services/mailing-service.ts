import nodemailer from "nodemailer";
import * as email from '../../config.js';

const mailingService = (recipient: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: email.EMAIL_SERVICE,
    auth: {
      user: email.EMAIL_USER,
      pass: email.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: email.EMAIL_USER,
    to: recipient,
    subject,
    text,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      return;
    }
    console.log(`Sent: + ${info.response}`);
  });
};

export default mailingService;
