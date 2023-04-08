import nodemailer from "nodemailer"; 
import dotenv from "dotenv";

dotenv.config();

// Email sending

export const sendEmail = async (to, companyId) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: "AYA POD5 WEB3 LMS",
    text: `Your Company ID is: ${companyId}`,
  };

  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.messageId);
      }
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};