import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your App Password
  },
  logger: true, // Logs SMTP actions (useful for debugging)
  debug: true,  // Shows detailed debug info
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Configuration Error:');
  } else {
    console.log('SMTP Server is ready to take messages:');
  }
});

// Function to send email
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"Shop Managment System" <${process.env.EMAIL_USER}>`, // Sender's name and email
      to, // Recipient's email
      subject, // Email subject
      text,    // Plain text body
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent successfully:', info.messageId);
    console.log('Email sent successfully:');
  } catch (error) {
    // console.error('Error sending email:', error.message);
    console.error('Error sending email:');
    throw error;
  }
};
