import nodemailer from "nodemailer";
import { email } from '../common/constants.js';

const mailingService = (recipient: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: email.emailService,
    auth: {
      user: email.emailUser,
      pass: email.emailPassword,
    },
  });

  const options = {
    from: email.emailUser,
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
