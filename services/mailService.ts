import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const mailService = {
  async sendMail(to: string, subject: string, content: string) {
    const mail = await transporter.sendMail({
      from: '"no-reply" <no-reply@donathub.store>',
      to,
      subject: subject,
      html: content,
    });
    return mail;
  },
};
