import nodemailer from "nodemailer";

export const sendMail = ({ to, sub, msg }) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.sendMail({
    from: `Wolmart < ${process.env.EMAIL_USER} >`,
    to: to,
    subject: sub,
    text: msg,
  });
};
