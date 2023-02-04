import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { Response } from "express";

type Body = {
  email: string;
  username: string;
};

export const sendEmail = (
  body: Body,
  URL: string,
  res: Response,
  file: string,
  subject: string
) => {
  const filePath = path.join(__dirname, `../templates/${file}.handlebars`);
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = { URL, username: body.username };
  const html = template(replacements);

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: body.email,
    subject,
    html,
  };

  const transport = {
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.PASSWORD_FROM,
    },
  };
  const transporter = nodemailer.createTransport(transport);

  transporter.verify((err, success) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Server is ready to take messages");
    }
  });

  transporter.sendMail(emailData, function (err, info) {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else if (info) {
      return res
        .status(200)
        .json({ message: `Email is sent to ${body.email}` });
    }
  });
};
